package project.dao;

import java.util.List;

import org.slim3.datastore.DaoBase;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Transaction;
import com.google.appengine.api.datastore.Query.FilterOperator;

import project.meta.EventTodoModelMeta;
import project.model.EventTodoModel;

public class EventTodoModelDao extends DaoBase<EventTodoModel>{
    //Datastore db;
    
    Key parentKey = KeyFactory.createKey("EventsPlanner", "Default");
    /**
     * Gets a list of event todos containing the string s
     * @param s the string reference
     * @return list of event todos
     */
    public List<EventTodoModel> getAllEventTodoContaining(String s){
        return null;
    }
    /**
     * Gets a list of all event todos
     * @return all event todos
     */
    public List<EventTodoModel> getAllEventTodo(){
        EventTodoModelMeta meta = new EventTodoModelMeta();
        return (List<EventTodoModel>) Datastore.query(meta).asList();
    }
    /**
     * Gets a list of all event todos in a specific sort order
     * @param sortOrder the sort order of event todos
     * @return list of sorted event todos 
     */
    public List<EventTodoModel> getAllEvent(String sortOrder){
        return null;
    }
    /**
     * Adds an Event todo in the Datastore
     * @param et the event todo added
     * @return whether transaction is successful
     */
    public boolean addEventTodo(EventTodoModel et){
        boolean ok = false;
        if(getEventTodoModelByTodoId(et.getEventID(),et.getTodoId())==null){
            Key key = Datastore.allocateId(parentKey, "EventTodoModel");
            Transaction trans = Datastore.beginTransaction();
            et.setKey(key);
            et.setId(key.getId());
            Datastore.put(et);
            trans.commit();
            ok = true;
        }
        return ok;
    }
    /**
     * Removes an Event todo in the the Datastore
     * @param key the key of the event to be removed
     * @return whether the transaction is successful
     */
    public boolean removeEventTodo(EventTodoModel et){
        boolean ok = true;
        
        try{
            EventTodoModel etm = getEventTodoModelById(et.getId());
            if(etm != null){
                Transaction  trans = Datastore.beginTransaction();
                Datastore.delete(etm.getKey());
                trans.commit();
            }
        }catch(Exception e){
            ok = false;
        }
        
        return ok;
    }
    /**
     * Updates an Event todo in the Datastore
     * @param et the Event todo to be updated
     * @return whether the transaction is successful
     */
    public boolean updateEventTodo(EventTodoModel et){
        boolean ok = true;
        
        try{
           EventTodoModel etm = getEventTodoModelById(et.getId());
          
            if(etm != null){
                Transaction  trans = Datastore.beginTransaction();
                etm.setEventTitle(et.getEventTitle());
                etm.setTodoDescription(et.getTodoDescription());
                etm.setTodoFinished_quantity(et.getTodoFinished_quantity());
                etm.setTodoTitle(et.getTodoTitle());
                Datastore.put(etm);
                trans.commit();
            }
        }catch(Exception e){
            ok = false;
        }
        return ok;
    }
    
    public EventTodoModel getEventTodoModelById(long id){
        EventTodoModelMeta meta = new EventTodoModelMeta();
        EventTodoModel etm = (EventTodoModel) Datastore.query(meta).filter("id",FilterOperator.EQUAL, id).asSingle();
        return etm;
    }
    public EventTodoModel getEventTodoModelByTodoId(long eventId, long id){
        EventTodoModelMeta meta = new EventTodoModelMeta();
        EventTodoModel etm = (EventTodoModel) Datastore.query(meta)
                                                       .filter("todoId",FilterOperator.EQUAL, id)
                                                       .filter("eventID",FilterOperator.EQUAL,eventId)
                                                       .asSingle();
        return etm;
    }
    
    
    public List<EventTodoModel> getAllEventTodoWithEventID(long eventId) {
        EventTodoModelMeta meta = new EventTodoModelMeta();
        return (List<EventTodoModel>) Datastore.query(meta)
                .filter("eventID",FilterOperator.EQUAL,eventId).asList();
    }
}

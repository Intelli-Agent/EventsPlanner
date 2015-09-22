package project.dao;

import java.util.List;

import org.slim3.datastore.DaoBase;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Transaction;
import com.google.appengine.api.datastore.Key;

import project.meta.EventModelMeta;
import project.model.EventModel;

public class EventModelDao {
    
    
    
    Key parentKey = KeyFactory.createKey("EventsPlanner", "Default");
    /**
     * Gets all events that contains String n in its title. <br> <br>
     * Ex.<br>
     * <br>
     *      "pa" -> (Party, Birthday Party and etc.)
     * @param s
     *            the string reference
     * @return List of todos.
     */
    public List<EventModel> getAllEventContaining(String s)
    {
        return null;

    }
    /**
     * Gets all Events (default ascending order).
     *
     * @return List of events.
     */
    public List<EventModel> getAllEvent()
    {
        return (List<EventModel>) Datastore.query((new EventModelMeta())).asList();
    }
    /**
     * Gets all events with particular sorting order.
     * Ex. <br>
     *
     *     EventService es = new EventService(); <br>
     *     es.getAllEvent(EventService.SORT_ORDER_ASC); <br>
     * @param sortOrder
     *            the sortingOrder of the query
     * @return List of Events.
     */
    public EventModel getEvent(long id){
        EventModel model = new EventModel();
        model = Datastore.query((new EventModelMeta())).filter("eventID", Query.FilterOperator.EQUAL, id).asSingle();
        return model;
        /*EventModelMeta event = new EventModelMeta();
        return Datastore.query(event, parentKey).filter("eventID", Query.FilterOperator.EQUAL, id).asSingle();
        */
    }
    public List<EventModel> getAllEvent(String sortOrder)
    {
        return null;
    }
    /**
     * Adds an Event object to the Datastore using EventDto.
     *
     * @param e
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public EventModel addEvent(EventModel event)
    {
        boolean ok = true;
        /*Transaction trans = Datastore.beginTransaction();
        Key key = Datastore.createKey(EventModel.class, e.getEventName());
        e.setKey(key);
        Datastore.put(e);
        trans.commit();*/
        
        try {
            Transaction trans = Datastore.beginTransaction();
            Key key = Datastore.allocateId(parentKey, "EventModel");
            event.setKey(key);
            event.setEventID(key.getId());
            Datastore.put(event);
            trans.commit();
            return event;
        } catch (Exception e) {
            ok = false;
        }
        return null;
    }
    /**
     * Removes an Event object in the Datastore using EventDto.
     *
     * @param e
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean removeEvent(Key key)
    {
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Datastore.delete(key);
        trans.commit();
        ok = true;
        return ok;
    }
    /**
     * Updates an Event object in the Datastore using EventDto.
     *
     * @param e
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean updateEvent(EventModel e)
    {
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Datastore.put(e);
        trans.commit();
        ok = true;
        return ok;
    }
}

package project.dto;

import java.util.ArrayList;
import java.util.List;

import org.slim3.datastore.Attribute;
import org.slim3.repackaged.org.json.JSONException;
import org.slim3.repackaged.org.json.JSONObject;

import project.model.EventTodoModel;

import com.google.appengine.api.datastore.Key;

public class EventTodoDto {
    
    private List<String> errorList = new ArrayList<String>();
    
    private long id;
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    
    /**
     * Event ID container
     */
    private long eventID;
    /**
     * Event Title container
     */
    private String eventTitle;
    
    /**
     * Todo Id associated with specific event
     */
    private long todoId;
    /**
     * 
     * @return the event ID
     * 
     */
    private TodoDto todo;
    
    /**
     * @return the todo
     */
    public TodoDto getTodo() {
        return todo;
    }
    /**
     * @param todo the todo to set
     */
    public void setTodo(TodoDto todo) {
        this.todo = todo;
    }
    public long getEventID(){
        return this.eventID;
    }
    /**
     * 
     * @param id the id to be set
     */
    public void setEventID(long id){
        this.eventID = id;
    }
    
    /**
     * @return the todoId
     */
    public long getTodoId() {
        return todoId;
    }
    /**
     * @param todoId the todoId to set
     */
    public void setTodoId(long todoId) {
        this.todoId = todoId;
    }

  private static final long serialVersionUID = 1L;

    @Attribute(primaryKey = true)
    private Key key;

    @Attribute(version = true)
    private Long version;

    /**
     * Returns the key.
     *
     * @return the key
     */
    public Key getKey() {
        return key;
    }

    /**
     * Sets the key.
     *
     * @param key
     *            the key
     */
    public void setKey(Key key) {
        this.key = key;
    }

    /**
     * Returns the version.
     *
     * @return the version
     */
    public Long getVersion() {
        return version;
    }

    /**
     * Sets the version.
     *
     * @param version
     *            the version
     */
    public void setVersion(Long version) {
        this.version = version;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((key == null) ? 0 : key.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        EventTodoModel other = (EventTodoModel) obj;
        if (key == null) {
            if (other.getKey() != null) {
                return false;
            }
        } else if (!key.equals(other.getKey())) {
            return false;
        }
        return true;
    }
    public List<String> getErrorList(){
        return this.errorList;
    }
    public JSONObject toJSON() throws JSONException
    {
        JSONObject json = new JSONObject();
        json.put("key", this.getKey());
        json.put("eventID",this.getEventID());
        json.put("todoId", this.getTodoId());
        json.put("todo", this.getTodo());
        return json;
    }
    public String getEventTitle() {
        return eventTitle;
    }
    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }
}

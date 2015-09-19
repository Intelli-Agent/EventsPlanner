package project.model;

import java.io.Serializable;
import java.util.List;

import com.google.appengine.api.datastore.Key;

import org.slim3.datastore.Attribute;
import org.slim3.datastore.Model;
import org.slim3.repackaged.org.json.JSONException;
import org.slim3.repackaged.org.json.JSONObject;

import project.model.EventModel;

@Model(schemaVersion = 1)
public class EventTodoModel implements Serializable {
    
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
     * Event title container
     */
    private String eventTitle;
    /**
     * TODO Id associated with specific event
     */
    private long todoId;
    /**
     *  Title of the Todo.
     */
    private String todoTitle;
    /**
     *  Description of the Todo.
     */
    private String todoDescription;
    /**
     *  Total Quantity of the Todo (1-n).
     */
    private int todoTotal_quantity;
    /**
     *  Finished Quantity of the Todo (1-total_quantity).
     *  
     */
    private int todoFinished_quantity;
    
    /**
     * @return the title
     */
    /**
     * 
     * @return the event ID
     * 
     */
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
     * 
     * @return the event title
     */
    public String getEventTitle(){
        return this.eventTitle;
    }
    /**
     * 
     * @param title the title to be set
     */
    public void setEventTitle(String title){
        this.eventTitle = title;
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
            if (other.key != null) {
                return false;
            }
        } else if (!key.equals(other.key)) {
            return false;
        }
        return true;
    }

    
    
    public JSONObject toJSON() throws JSONException
    {
        JSONObject json = new JSONObject();
        json.put("key", this.getKey());
        json.put("eventID",this.getEventID());
        json.put("eventTitle", this.getEventTitle());
        json.put("todoId", this.getTodoId());
        return json;
    }
    public String getTodoTitle() {
        return todoTitle;
    }
    public void setTodoTitle(String todoTitle) {
        this.todoTitle = todoTitle;
    }
    public String getTodoDescription() {
        return todoDescription;
    }
    public void setTodoDescription(String todoDescription) {
        this.todoDescription = todoDescription;
    }
    public int getTodoTotal_quantity() {
        return todoTotal_quantity;
    }
    public void setTodoTotal_quantity(int todoTotal_quantity) {
        this.todoTotal_quantity = todoTotal_quantity;
    }
    public int getTodoFinished_quantity() {
        return todoFinished_quantity;
    }
    public void setTodoFinished_quantity(int todoFinished_quantity) {
        this.todoFinished_quantity = todoFinished_quantity;
    }
    
}

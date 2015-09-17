package project.dto;

import java.util.ArrayList;
import java.util.List;

import org.slim3.datastore.Attribute;
import org.slim3.repackaged.org.json.JSONException;
import org.slim3.repackaged.org.json.JSONObject;

import com.google.appengine.api.datastore.Key;

public class EventModelDto {
private static final long serialVersionUID = 1L;

    List<String> errorList = new ArrayList<String>();
    /**
     * Event ID container
     */
    private long eventID;
    /**
     *  Event Name container.
     */
    private String eventName;
    /**
     *  Description container.
     */
    private String description;

    /**
     * @return the event ID
     */
    public long getEventID(){
        return eventID;
    }
    /**
     * @param id the eventID to set
     */
    public void setEventID(long id){
        this.eventID = id;       
    }
    /**
     * @return the eventName
     */
    public String getEventName() {
        return eventName;
    }
    /**
     * @param eventName the Event name to set
     */
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }


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
        EventModelDto other = (EventModelDto) obj;
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
        json.put("eventID", this.getEventID());
        json.put("eventTitle",this.getEventName());
        json.put("eventDescription", this.getDescription());
        return json;
    }
    public List<String> getErrorList() {
        // TODO Auto-generated method stub
        return this.errorList;
    }
    

}

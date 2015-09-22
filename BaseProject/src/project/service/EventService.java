
package project.service;

import java.util.ArrayList;
import java.util.List;

import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;

import project.dao.EventModelDao;
import project.dto.EventModelDto;
import project.model.EventModel;

public class EventService {
    /**
     *  Ascending order of EventService transactions.
     */
    public static final String SORT_ORDER_ASC = "asc";
    /**
     *  Descending order of EventService transactions.
     */
    public static final String SORT_ORDER_DESC = "desc";
    /**
     *  Database Access Object assigned to EventService.
     */
    private EventModelDao dao = new EventModelDao();
    /**
         * Gets all events that contains String n in its title. <br> <br>
         * Ex.<br>
         * <br>
         *      "pa" -> (Party, Birthday Party and etc.)
         * @param s
         *            the string reference
         * @return List of events.
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
        public List<EventModelDto> getAllEvents()
        {
            List<EventModel> models = dao.getAllEvent();
            List<EventModelDto> dtos = new ArrayList<EventModelDto>();
            for(EventModel model: models){
                EventModelDto temp = new EventModelDto();
                temp.setEventName(model.getEventName());
                temp.setDescription(model.getDescription());
                temp.setEventID(model.getEventID());
                dtos.add(temp);
            }
            return dtos;
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
        public EventModelDto addEvent(EventModelDto e)
        {
            EventModel model = new EventModel();
            model.setEventName(e.getEventName());
            model.setEventID(e.getEventID());
            model.setDescription(e.getDescription());
            e.setEventID(dao.addEvent(model).getEventID());
            return e;
        }
        /**
         * Removes an Event object in the Datastore using EventDto.
         *
         * @param e
         *            the refernce to be added.
         * @return Whether transaction is succesful or not.
         */
        public boolean removeEvent(EventModelDto e)
        {
            Key key = Datastore.createKey(EventModel.class, e.getEventID());
            return dao.removeEvent(key);
        }
        /**
         * Updates an Event object in the Datastore using EventDto.
         *
         * @param e
         *            the refernce to be added.
         * @return Whether transaction is succesful or not.
         */
        public boolean updateEvent(EventModelDto e)
        {
            EventModel model = new EventModel();
            model.setDescription(e.getDescription());
            model.setEventID(e.getEventID());
            model.setEventName(e.getEventName());
            Key key = Datastore.createKey(EventModel.class, e.getEventID());
            model.setKey(key);
            return dao.updateEvent(model);
        }
        public EventModelDto loadEventToDto(EventModelDto dto){
            EventModelDao dao = new EventModelDao();
            EventModel model = dao.getEvent(dto.getEventID());
            dto.setEventName(model.getEventName());
            dto.setDescription(model.getDescription());
            return dto;
            
        }
}

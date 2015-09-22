package project.controller.admin.event;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;

import project.dto.EventModelDto;
import project.service.EventService;

public class AddEventController extends Controller {

    @Override
    public Navigation run() throws Exception {
        EventService service = new EventService();
        EventModelDto dto = new EventModelDto();
        JSONObject json = new JSONObject();
        try{
            json = new JSONObject(this.request.getReader().readLine());
            dto.setEventName(json.getString("eventName"));
            dto.setDescription(json.getString("description"));
            json.put("EventId", service.addEvent(dto).getEventID());
        }catch(Exception e){
        }
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().write(json.toString());
        return null;
    }
}

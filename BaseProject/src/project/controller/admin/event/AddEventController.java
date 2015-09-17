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
        JSONObject obj = new JSONObject();
        try{
            dto.setEventName("BIRTHDAY PARTY");
            dto.setEventID(2);
            dto.setDescription("bi");
            service.addEvent(dto);
        }catch(Exception e){
            
            
        }
        return null;
    }
}

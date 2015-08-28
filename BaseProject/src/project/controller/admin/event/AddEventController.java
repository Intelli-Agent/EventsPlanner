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
            dto.setEventName("Dota MPGL is now in CIT-U!");
            dto.setEventID(5);
            dto.setDescription("Gather up you team and compete with other opposing teams to win this year's aegis of immortal!");
            service.addEvent(dto);
        }catch(Exception e){
            
            
        }
        return null;
    }
}

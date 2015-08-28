package project.controller.admin.event;

import java.util.ArrayList;
import java.util.List;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;

import project.dto.EventModelDto;
import project.service.EventService;

public class GetAllController extends Controller {

    @Override
    public Navigation run() throws Exception {
        EventService service = new EventService();
        JSONObject data = new JSONObject();
        List<String> errorList = new ArrayList<String>();
        try{
            data.put("events",service.getAllEvents());
        }catch(Exception e)
        {
            errorList.add("Server error! Exception in getController of Events!");            
        }
        response.setContentType("application/json");
        response.getWriter().write(data.toString());
        return null;
    }
}

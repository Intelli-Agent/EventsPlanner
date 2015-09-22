package project.controller.admin.eventTodo;

import java.util.ArrayList;
import java.util.List;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;

import project.dto.EventTodoDto;
import project.dto.TodoDto;
import project.service.EventTodoService;

public class GetTodoListController extends Controller {

    @Override
    public Navigation run() throws Exception {
        EventTodoService service = new EventTodoService();
        JSONObject json = new JSONObject();
        List<String> errorList = new ArrayList<String>();
        List<EventTodoDto> todoList = null;
        try{
            String requestParameter = this.request.getParameter("eventID");
            int eventId = Integer.parseInt(requestParameter);
            todoList = service.getAllTodosByEventID(eventId);
        }
        catch(Exception e){
            e.printStackTrace();
            errorList.add(e.getMessage());
        }
        
        json.put("todoList", todoList);
        json.put("errorList", errorList);
        response.setContentType("application/json");
        response.getWriter().write(json.toString());
        return null;
    }
}

package project.controller.admin.eventTodo;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;

import project.dto.EventTodoDto;
import project.model.EventTodoModel;
import project.service.EventTodoService;

public class AddEventTodoController extends Controller {

    @Override
    protected Navigation run() throws Exception {
        EventTodoService service = new EventTodoService();
        JSONObject json = new JSONObject();
        EventTodoDto eventTodo = new EventTodoDto();
        try{
            json = new JSONObject(this.request.getReader().readLine());
            eventTodo.setEventID(json.getInt("eventID"));
            eventTodo.setTodoId(json.getLong("todoID"));
            service.addEventTodo(eventTodo);
        }catch(Exception e){
            e.printStackTrace();
            eventTodo.getErrorList().add("Server controller error: "+ e.getMessage());
        }
        json.put("eventTodo", eventTodo.toJSON());
        json.put("errorList", eventTodo.getErrorList());
        response.setContentType("application/json");
        response.getWriter().write(json.toString());
        return null;
    }

}

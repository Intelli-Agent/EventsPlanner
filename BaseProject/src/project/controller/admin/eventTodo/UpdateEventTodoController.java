package project.controller.admin.eventTodo;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;

import project.dto.EventTodoDto;
import project.dto.TodoDto;
import project.model.EventTodoModel;
import project.service.EventTodoService;

public class UpdateEventTodoController extends Controller {
    
    EventTodoModel et = new EventTodoModel();
    @Override
    protected Navigation run() throws Exception {
        // TODO Auto-generated method stub
        EventTodoService service = new EventTodoService();
        JSONObject json = new JSONObject();
        EventTodoDto eventTodo = new EventTodoDto();
        try{
            json = new JSONObject((String) this.requestScope("data"));
            eventTodo.setEventID(json.getInt("eventID"));
            eventTodo.setEventTitle(json.getString("eventTitle"));
            eventTodo.setTodoId(json.getString("todoID"));
            // Todo Info
            TodoDto todo = new TodoDto();
            todo.setId(json.getString("todoID"));
            todo.setFinished_quantity(json.getInt("finished_quantity"));
            todo.setTitle(json.getString("title"));
            todo.setDescription(json.getString("description"));
            todo.setTotal_quantity(json.getInt("total_quantity"));
            //
            eventTodo.setTodo(todo);
            service.updateEventTodo(eventTodo);
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

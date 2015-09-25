package project.controller.admin.eventTodo;

import java.util.ArrayList;
import java.util.List;

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
        List<String> errorList = new ArrayList<String>();
        try{
            json = new JSONObject(this.request.getReader().readLine());
            eventTodo.setId(json.getLong("id"));
            eventTodo.setEventID(json.getLong("eventID"));
            eventTodo.setEventTitle(json.getString("eventTitle"));
            eventTodo.setTodoId(json.getLong("todoId"));
            // Todo Info
            JSONObject todoJson = json.getJSONObject("todo");
            TodoDto todo = new TodoDto();
            todo.setId(todoJson.getLong("id"));
            todo.setFinished_quantity(todoJson.getInt("finished_quantity"));
            todo.setTitle(todoJson.getString("title"));
            todo.setDescription(todoJson.getString("description"));
            todo.setTotal_quantity(todoJson.getInt("total_quantity"));
            if(todo.getFinished_quantity() > todo.getTotal_quantity())
                throw new Exception("Sorry but you can't do more to this TODO.");
            else{
            eventTodo.setTodo(todo);
            service.updateEventTodo(eventTodo);
            }
        }catch(Exception e){
            errorList.add(e.getMessage());
        }
        json.put("eventTodo", eventTodo.toJSON());
        json.put("errorList",errorList);
        response.setContentType("application/json");
        response.getWriter().write(json.toString());
        return null;
    }

}

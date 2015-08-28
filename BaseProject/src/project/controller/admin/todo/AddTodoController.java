package project.controller.admin.todo;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;
import com.google.appengine.api.datastore.Key;

import project.dto.TodoDto;
import project.service.TodoService;

public class AddTodoController extends Controller {

    int counter = 1;
    @Override
    public Navigation run() throws Exception {
        TodoService service = new TodoService();
        JSONObject json = new JSONObject();
        TodoDto todo = new TodoDto();
        try {
            json = new JSONObject((String)this.requestScope("data"));
            todo.setTitle(json.getString("title"));
            todo.setDescription(json.getString("description"));
            todo.setFinished_quantity(0);
            todo.setTotal_quantity(json.getInt("total_quantity"));
            service.addTodo(todo);
        } catch (Exception e) {
            e.printStackTrace();
            todo.getErrorList().add("Server controller error: " + e.getMessage());
        }
        json.put("todo", todo.toJSON());
        json.put("errorList", todo.getErrorList());
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.getWriter().write(json.toString());
        
        return null;
    }
}

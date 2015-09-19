package project.controller.admin.todo;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;
import project.dto.TodoDto;
import project.service.TodoService;

public class UpdateTodoController extends Controller {

    @Override
    public Navigation run() throws Exception {
        TodoService service = new TodoService();
        JSONObject json = new JSONObject();
        TodoDto todo = new TodoDto();
        
        try {
            json = new JSONObject(this.request.getReader().readLine());
            todo.setTitle(json.getString("title"));
            todo.setDescription(json.getString("description"));
            todo.setId(json.getLong("id"));
            todo.setTotal_quantity(json.getInt("total_quantity"));
            service.updateTodo(todo);
        } catch (Exception e) {
            e.printStackTrace();
            todo.getErrorList().add("Server controller error: " + e.getMessage());
        }
        json.put("errorList", todo.getErrorList());
        response.setContentType("application/json");
        response.getWriter().write(json.toString());
        return null;
    }
}

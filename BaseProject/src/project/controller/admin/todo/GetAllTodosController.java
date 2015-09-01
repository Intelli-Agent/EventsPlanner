package project.controller.admin.todo;

import java.util.ArrayList;
import java.util.List;

import org.slim3.controller.Controller;
import org.slim3.controller.Navigation;
import org.slim3.repackaged.org.json.JSONObject;

import project.service.TodoService;

public class GetAllTodosController extends Controller {

    @Override
    public Navigation run() throws Exception {
        TodoService service = new TodoService();
        //System.out.println(service.getAllTodos());
        JSONObject jsonData = new JSONObject();
        List<String> errorList = new ArrayList<String>();
        try{
            jsonData.put("todos", service.getAllTodos());
        }catch(Exception e){
            errorList.add(e.getMessage());
            e.printStackTrace();
        }
        jsonData.put("errorList", errorList);
        response.setContentType("application/json");
        response.getWriter().write(jsonData.toString());
        return null;
    }
}

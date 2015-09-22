package project.service;

import java.util.ArrayList;
import java.util.List;

import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;

import project.dao.EventModelDao;
import project.dao.EventTodoModelDao;
import project.dao.TodoDao;
import project.dto.EventTodoDto;
import project.dto.TodoDto;
import project.model.EventModel;
import project.model.EventTodoModel;
import project.model.Todo;


public class EventTodoService {
    EventTodoModelDao dao = new EventTodoModelDao();
    
    public boolean addEventTodo(EventTodoDto et){
        EventTodoModel model = new EventTodoModel();
        model.setEventID(et.getEventID());
        model.setTodoId(et.getTodoId());
        model.setEventTitle((new EventModelDao()).getEvent(model.getEventID()).getEventName());
        TodoDao todoDao = new TodoDao();
        Todo todo = todoDao.getTodoById(model.getTodoId());
        model.setTodoTitle(todo.getTitle());
        model.setTodoDescription(todo.getDescription());
        model.setTodoTotal_quantity(todo.getTotal_quantity());
        return dao.addEventTodo(model);
    }
    public boolean removeEventTodo(EventTodoDto et){
        EventTodoModel etm = new EventTodoModel();
        etm.setId(et.getId());
        return dao.removeEventTodo(etm);
    }
    public boolean updateEventTodo(EventTodoDto et){
        EventTodoModel model = new EventTodoModel();
        model.setId(et.getId());
        model.setEventID(et.getEventID());
        model.setTodoId(et.getTodoId());
        model.setEventTitle(et.getEventTitle());
        //TodoModel 
        TodoDto todo = et.getTodo();
        model.setTodoTitle(todo.getTitle());
        model.setTodoDescription(todo.getDescription());
        model.setTodoTotal_quantity(todo.getTotal_quantity());
        model.setTodoFinished_quantity(todo.getFinished_quantity());
        return dao.updateEventTodo(model);
    }
    public List<EventTodoDto> getAllTodosByEventID(int eventId){
        List<EventTodoModel> models = dao.getAllEventTodoWithEventID(eventId);
        List<EventTodoDto> dtos = new ArrayList<EventTodoDto>();
        
        for(EventTodoModel model : models)
        {
            EventTodoDto dto = new EventTodoDto();
            dto.setId(model.getId());
            dto.setEventID(model.getEventID());
            dto.setEventTitle(model.getEventTitle());
            dto.setTodoId(model.getTodoId());
                TodoDto todo = new TodoDto();
                todo.setId(model.getTodoId());
                todo.setFinished_quantity(model.getTodoFinished_quantity());
                todo.setTitle(model.getTodoTitle());
                todo.setTotal_quantity(model.getTodoTotal_quantity());
                todo.setDescription(model.getTodoDescription());
            dto.setTodo(todo);
            dtos.add(dto);
        }
        
        return dtos;
    }
}

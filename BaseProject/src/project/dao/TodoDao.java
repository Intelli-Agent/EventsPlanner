package project.dao;


import java.util.List;




import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Transaction;

import project.meta.TodoMeta;
import project.model.Todo;

public class TodoDao{
    Key parentKey = KeyFactory.createKey("EventsPlanner", "Default");
    /**
     * Gets all todos that contains String n in its title. <br> <br>
     * Ex.<br>
     * <br>
     *      "ma" -> (Make ballpen, Marinate Chicken, and etc.)
     * @param s
     *            the string reference
     * @return List of todos.
     */
    public Todo getTodoByProperty(String propertyName,Object value)
    {
        Todo model= null;
        TodoMeta meta = new TodoMeta();
        model = Datastore.query(meta).filter(propertyName, FilterOperator.EQUAL, value).asSingle();
        return model;
        
    }
    /**
     * Gets all todos (default ascending order).
     * 
     * @return List of todos.
     */
    public List<Todo> getAllTodos()
    {
       TodoMeta meta = new TodoMeta();
       List<Todo> models = Datastore.query(meta ,parentKey).asList();
       return models;
    }
    /**
     * Gets all todos with particular sorting order. 
     * Ex. <br>
     * 
     *     TodoService ts = new TodoService(); <br>
     *     ts.getAllTodos(TodoService.SORT_ORDER_ASC); <br>
     * @param sortOrder
     *            the sortingOrder of the query
     * @return List of todos.
     */
    public List<Todo> getAllTodos(String sortOrder)
    {
        return null;
    }
    /**
     * Adds a Todo object to the Datastore using TodoDto. 
     *
     * @param todo
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean addTodo(Todo todo)
    {
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Key key = Datastore.allocateId(parentKey, "Todo");
        todo.setKey(key);
        todo.setId(key.getId());
        Datastore.put(todo);
        trans.commit();
        ok = true;
        return ok;
    }
    /**
     * Removes a Todo object in the Datastore using Todo. 
     *
     * @param todo
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean removeTodo(Todo model)
    {
        boolean ok = true;
        try{
            Todo todo = getTodoByProperty("id",model.getId());
            if(todo!=null){
                Transaction tran = Datastore.beginTransaction();
                Datastore.delete(todo.getKey());
                tran.commit();
            }
            
        }catch(Exception e){
            
            ok = false;
        }
        
        return ok;
    }
    /**
     * Updates a Todo object in the Datastore using Todo. 
     *
     * @param todo
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean updateTodo(Todo model)
    {
        boolean ok = true;
        try{
            Todo todo = getTodoByProperty("id",model.getId());
            if(todo!=null){
                Transaction tran = Datastore.beginTransaction();
                todo.setTitle(model.getTitle());
                todo.setDescription(model.getDescription());
                todo.setTotal_quantity(model.getTotal_quantity());
                Datastore.put(todo);
                tran.commit();
            }
            
        }catch(Exception e){
            
            ok = false;
        }
        
        return ok;
    }
    public Todo getTodoById(long l) {
        return getTodoByProperty("id",l);
    }
}

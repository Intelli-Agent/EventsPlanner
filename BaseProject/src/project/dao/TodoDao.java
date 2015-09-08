package project.dao;


import java.util.List;




import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Transaction;

import project.meta.TodoModelMeta;
import project.model.TodoModel;

public class TodoDao{
    /**
     * Gets all todos that contains String n in its title. <br> <br>
     * Ex.<br>
     * <br>
     *      "ma" -> (Make ballpen, Marinate Chicken, and etc.)
     * @param s
     *            the string reference
     * @return List of todos.
     */
    public TodoModel getTodoByTitle(String title)
    {
        TodoModel model= null;
        Key key = Datastore.createKey(TodoModel.class, title);
        model = Datastore.query(TodoModel.class).filter("title", Query.FilterOperator.EQUAL, title).asSingle();
        //model.setKey(key);
        return model;
        
    }
    /**
     * Gets all todos (default ascending order).
     * 
     * @return List of todos.
     */
    public List<TodoModel> getAllTodos()
    {
       Transaction trans = Datastore.beginTransaction();
        List<TodoModel> list = (List<TodoModel>) Datastore.query(TodoModel.class).asList();
        trans.commit();
        return list;
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
    public List<TodoModel> getAllTodos(String sortOrder)
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
    public boolean addTodo(TodoModel todo)
    {
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Key key = Datastore.createKey(TodoModel.class, todo.getId());
        todo.setKey(key);
        Datastore.put(todo);
        trans.commit();
        ok = true;
        return ok;
    }
    /**
     * Removes a Todo object in the Datastore using TodoModel. 
     *
     * @param todo
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean removeTodo(Key key)
    {
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Datastore.delete(key);
        trans.commit();
        ok = true;
        return ok;
    }
    /**
     * Updates a Todo object in the Datastore using TodoModel. 
     *
     * @param todo
     *            the refernce to be added.
     * @return Whether transaction is succesful or not.
     */
    public boolean updateTodo(TodoModel todo)
    {
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Datastore.put(todo);
        trans.commit();
        ok = true;
        return ok;
    }
    public TodoModel getTodoById(String todoId) {
        TodoModel model= null;
        model = Datastore.query(TodoModel.class).filter("id", Query.FilterOperator.EQUAL, todoId).asSingle();
        //model.setKey(key);
        return model;
    }
}

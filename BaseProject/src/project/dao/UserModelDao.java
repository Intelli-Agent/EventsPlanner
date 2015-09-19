package project.dao;

import java.util.List;

import org.slim3.datastore.DaoBase;
import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Transaction;

import project.dto.UserDto;
//import project.meta.TodoModelMeta;
import project.meta.UserModelMeta;
//import project.model.TodoModel;
import project.model.UserModel;

public class UserModelDao extends DaoBase<UserModel>{
    Datastore db;
    
    
    /**
     * Adds a user to the database
     * @param user
     *          the user to be added
     * @return whether the transaction is successful or not.
     */
    public boolean addUserModel(UserModel user){
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Key key = Datastore.createKey(UserModel.class, user.getName());
        user.setKey(key);
        Datastore.put(user);
        trans.commit();
        ok = true;
        return ok;
    }
    
    /**
     * Removes a user to the database
     * @param user
     *          the user to be removed
     * @return whether the transaction is successful or not.
     */
    public boolean removeUserModel(Key key){
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Datastore.delete(key);
        trans.commit();
        ok = true;
        return ok;
    }
    
    /**
     * Updates a user to the database
     * @param user
     *          the user to be updated
     * @return whether the transaction is successful or not.
     */
    public boolean updateUserModel(UserModel user){
        boolean ok = false;
        Transaction trans = Datastore.beginTransaction();
        Datastore.put(user);
        trans.commit();
        ok = true;
        return ok;
    }
    
    /**
     * Gets a user to the database
     * @param user
     *          the user to be updated
     * @return whether the transaction is successful or not.
     */
    public UserModel getUsermodel(UserDto user){
        //String json = null;
        UserModel model= null;
        model = Datastore.get(UserModel.class, Datastore.createKey(UserModel.class, user.getName()));
        //UserModelMeta tm = new UserModelMeta();
        //json = tm.modelToJson(model);
        return model;
    }
}

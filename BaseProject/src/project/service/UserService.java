package project.service;

import java.util.List;

import org.slim3.datastore.Datastore;

import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Transaction;

import project.dao.UserModelDao;
import project.dto.UserDto;
import project.meta.TodoModelMeta;
import project.meta.UserModelMeta;
import project.model.TodoModel;
import project.model.UserModel;


public class UserService {
    /**
     * Data access object assigned to UserService
     */
    private UserModelDao userModelDao = new UserModelDao();
    
    
    
    /**
     * Adds a user to the database
     * @param user
     *          the user to be added
     * @return whether the transaction is successful or not.
     */
    public boolean addUserModel(UserDto user){
        UserModel model = new UserModel();
        model.setKey(user.getKey());
        model.setAddress(user.getAddress());
        model.setAge(user.getAge());
        model.setBirthday(user.getBirthday());
        model.setEmail(user.getEmail());
        model.setName(user.getName());
        model.setUsername(user.getUsername());
        model.setPassword(user.getPassword());
        return userModelDao.addUserModel(model);
        //return true;
        
    }
    
    /**
     * Removes a user to the database
     * @param user
     *          the user to be removed
     * @return whether the transaction is successful or not.
     */
    public boolean removeUserModel(UserDto user){
        //UserModel model = new UserModel();
        Key key = Datastore.createKey(UserModel.class, user.getName());
        //model.setKey(key);
        return userModelDao.removeUserModel(key);
    }
    
    /**
     * Updates a user to the database
     * @param user
     *          the user to be updated
     * @return whether the transaction is successful or not.
     */
    public boolean updateUserModel(UserDto user){
        UserModel model = new UserModel();
        model.setAddress(user.getAddress());
        model.setAge(user.getAge());
        model.setBirthday(user.getBirthday());
        model.setEmail(user.getEmail());
        model.setName(user.getName());
        model.setUsername(user.getUsername());
        model.setPassword(user.getPassword());
        Key key = Datastore.createKey(UserModel.class, user.getName());
        model.setKey(key);
        return userModelDao.updateUserModel(model);
    }
    
    /**
     * Gets a user to the database
     * @param user
     *          the user to be updated
     * @return whether the transaction is successful or not.
     */
    public UserDto getUsermodel(UserDto user){
        UserModel model = userModelDao.getUsermodel(user);
        // User <- Model
        user.setAge(model.getAge());
        user.setAddress(model.getAddress());
        user.setBirthday(model.getBirthday());
        user.setEmail(model.getEmail());
        user.setImgSrc(model.getImgSrc());
        user.setKey(model.getKey());
        user.setName(model.getName());
        user.setUsername(model.getUsername());
        user.setPassword(model.getPassword());
        return user;
    }
}

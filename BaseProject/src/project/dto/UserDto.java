package project.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.slim3.datastore.Attribute;
import org.slim3.repackaged.org.json.JSONException;
import org.slim3.repackaged.org.json.JSONObject;

import project.model.UserModel;

import com.google.appengine.api.datastore.Key;

public class UserDto {
    
    
    // Generated 
    private static final long serialVersionUID = 1L;
    
    private List<String> errorList = new ArrayList<String>();
    
    /**
     * User's Image source
     */
    private String imgSrc;
    /**
     * User's username
     */
    private String username;
    /**
     * User's password
     */
    private String password;
    /**
     * User's name
     */
    private String name;
    /**
     * User's age
     */
    private int age;
    /**
     * User's address
     */
    private String address;
    /**
     * User's email address
     */
    private String email;
    /**
     * User's birthday
     */
    private Date birthday;
    

    /**
     * @return the imgSrc
     */
    public String getImgSrc() {
        return imgSrc;
    }

    /**
     * @param imgSrc the imgSrc to set
     */
    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the age
     */
    public int getAge() {
        return age;
    }

    /**
     * @param age the age to set
     */
    public void setAge(int age) {
        this.age = age;
    }

    /**
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the birthday
     */
    public Date getBirthday() {
        return birthday;
    }

    /**
     * @param birthday the birthday to set
     */
    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }
    /**
     * @return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
    }
    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }
    @Attribute(primaryKey = true)
    private Key key;
    
    @Attribute(version = true)
    private Long version;
    
    /**
     * Returns the key.
     *
     * @return the key
     */
    public Key getKey() {
        return key;
    }
    
    /**
     * Sets the key.
     *
     * @param key
     *            the key
     */
    public void setKey(Key key) {
        this.key = key;
    }
    
    /**
     * Returns the version.
     *
     * @return the version
     */
    public Long getVersion() {
        return version;
    }
    
    /**
     * Sets the version.
     *
     * @param version
     *            the version
     */
    public void setVersion(Long version) {
        this.version = version;
    }
    
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((key == null) ? 0 : key.hashCode());
        return result;
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        UserModel other = (UserModel) obj;
        if (key == null) {
            if (other.getKey() != null) {
                return false;
            }
        } else if (!key.equals(other.getKey())) {
            return false;
        }
        return true;
    }
    
    /**
     * Returns the list of errors
     *
     * @return the list of errors
     */
    public List<String> getErrorList(){
        return this.errorList;
    }
    
    public JSONObject toJSON() throws JSONException
    {
        JSONObject json = new JSONObject();
            json.put("key", this.getKey());
            json.put("username", this.getUsername());
            json.put("password", this.getPassword());
            json.put("name", this.getName());
            json.put("age", this.getAge());
            json.put("address", this.getAddress());
            json.put("email", this.getEmail());
            json.put("birthday", this.getBirthday());
            //json.put("imgSrc", this.getImgSrc());
        return json;
        
        
    }
    
}
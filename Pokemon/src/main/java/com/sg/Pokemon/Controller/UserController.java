package com.sg.Pokemon.Controller;

import com.sg.Pokemon.Data.UserDatabase;
import com.sg.Pokemon.Data.UserRepository;
import com.sg.Pokemon.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController implements UserRepository {

    @Autowired
    private final UserDatabase userDatabase;

    public UserController(UserDatabase userDatabase) {
        this.userDatabase = userDatabase;
    }

    @CrossOrigin
    @GetMapping("/Users")
    public List<User> getAllUsers() {
        return userDatabase.getAllUsers();
    }

    @CrossOrigin
    @GetMapping("/Users/{id}")
    public User getUserById(@PathVariable int id) {
        return userDatabase.getUserById(id);
    }

    @CrossOrigin
    @PostMapping("/Login")
    public User login(@RequestBody User user) {
        return userDatabase.login(user);
    }

    @CrossOrigin
    @PostMapping("/Register")
    public User addUser(@RequestBody User user) {
        return userDatabase.addUser(user);
    }

}

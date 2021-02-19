package com.sg.Pokemon.Data;

import com.sg.Pokemon.Model.User;

import java.util.List;

public interface UserRepository {

    List<User> getAllUsers();

    User getUserById(int id);

    User addUser(User user);

    User login(User user);
}

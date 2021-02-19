package com.sg.Pokemon.Data;

import com.sg.Pokemon.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

//Make an API takes
@Repository
public class UserDatabase implements UserRepository {

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public UserDatabase(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public String sql;
    @Override
    public List<User> getAllUsers() {
        sql = "Select * from users;";
        List<User> users = jdbcTemplate.query(sql, new UserMapper());
        return users;
    }

    @Override
    public User getUserById(int id) {
        String sql = "Select * from users where user_id = " + id;
        User user = jdbcTemplate.queryForObject(sql, new UserMapper());
        return user;
    }

    @Override
    public User addUser(User user) {

        String username = user.getUsername();
        String password = user.getPassword();
        sql = "Insert into users(username,password) values (?,?)";
        jdbcTemplate.update(sql, username, password);
        return user;
    }

    @Override
    public User login(User user) {
        sql = "select * from users where username = \"" + user.getUsername() + "\" and password = \""+ user.getPassword() +"\";";
        user = jdbcTemplate.queryForObject(sql, new UserMapper());
        return user;
    }

    private static final class UserMapper implements RowMapper<User> {

        @Override
        public User mapRow(ResultSet rs, int index) throws SQLException{
            User user = new User();
            user.setUser_Id(rs.getInt("user_Id"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));

            return user;
        }
    }
}

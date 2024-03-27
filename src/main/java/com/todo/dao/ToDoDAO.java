package com.todo.dao;

import java.util.List;
import com.todo.modal.ToDo;

public interface ToDoDAO {

    List<ToDo>get();

    ToDo get(int id);

    void save(ToDo todo);

    void delete(int id);
}

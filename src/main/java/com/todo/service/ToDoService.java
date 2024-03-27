package com.todo.service;

import java.util.List;
import com.todo.modal.ToDo;

public interface ToDoService {
    List<ToDo> get();

    ToDo get(int id);

    void save (ToDo id);

    void delete(int id);
}

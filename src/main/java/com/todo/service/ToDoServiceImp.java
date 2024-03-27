package com.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.todo.dao.ToDoDAO;
import com.todo.modal.ToDo;

@Service
public class ToDoServiceImp implements ToDoService {

    @Autowired
    private ToDoDAO toDoDAO;

    @Transactional
    @Override
    public List<ToDo> get(){
        return toDoDAO.get();
    }

    @Transactional
    @Override
    public ToDo get(int id){
        return toDoDAO.get(id);
    }

    @Transactional
    @Override
    public void save(ToDo id){
        toDoDAO.save(id);
    }

    @Transactional
    @Override
    public void delete(int id){
        toDoDAO.delete(id);
    }
}

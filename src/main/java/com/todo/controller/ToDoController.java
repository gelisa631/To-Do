package com.todo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.service.ToDoService;
import com.todo.modal.ToDo;

@RestController
@RequestMapping("/api")
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @GetMapping("/todo")
    public List<ToDo> get(){
        return toDoService.get();
    }

    @PostMapping("/todo")
    public ToDo save(@RequestBody ToDo todo){
        toDoService.save(todo);
        return todo;
    }

    @GetMapping("/todo/{id}")
    public ToDo get(@PathVariable int id){
        return toDoService.get(id);
    }

    @DeleteMapping("/employee/{id}")
    public String delete(@PathVariable int id){
        toDoService.delete(id);
        return "Task removed with id: " + id;
    }

    @PutMapping("/id")
    public ToDo update(@RequestBody ToDo id){
        toDoService.save(id);
        return id;
    }
}

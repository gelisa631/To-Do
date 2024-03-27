package com.todo.dao;

import java.util.List;
import java.util.Objects;

import jakarta.persistence.EntityManager;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.stereotype.Repository;

import com.todo.modal.ToDo;

@EntityScan("com.todo.modal")
@Repository
public class ToDoDAOImp implements ToDoDAO {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<ToDo> get(){
        Session currSession = entityManager.unwrap(Session.class);
        Query<ToDo> query = currSession.createQuery("FROM todo", ToDo.class);
        List<ToDo> list = query.getResultList();
        return list;
    }

    @Override
    public ToDo get(int taskID){
        Session currSession = entityManager.unwrap(Session.class);
        return currSession.get(ToDo.class, taskID);
    }

    @Override
    public void save(ToDo task){
        Session currSession = entityManager.unwrap(Session.class);
        if (Objects.isNull(currSession.find(ToDo.class, task.getId()))){
            currSession.persist(task);
        }else{
            currSession.merge(task);
        }


    }

    @Override
    public void delete(int id){
        Session currSession = entityManager.unwrap(Session.class);
        ToDo taskID = currSession.get(ToDo.class, id);
        currSession.delete(taskID);
    }

}

package com.todo.modal;

import java.sql.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity(name="todo")
@Table(name = "tb_todo")
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    @Column
    private String task;

    @Column
    private String priority;

    @Column
    private String completed;

    @Column
    private Date duedate;

    public ToDo() {
        id = 0;
        task = "default task description";
        priority = "Low";
        completed = "No";
        duedate = Date.valueOf("1990-01-01");
    }

    public ToDo(Integer id, String task, String priority, String completed, Date duedate) {
        this.id = id;
        this.task = task;
        this.priority = priority;
        this.completed = completed;
        this.duedate = duedate;
    }

    @Override
    public String toString(){
        return "Task [id = " + id + ", task = " + task + ", priority=" + priority + ", completed=" + completed + ", duedate=" + duedate + "]";
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public Date getDuedate() {
        return duedate;
    }

    public void setDuedate(Date duedate) {
        this.duedate = duedate;
    }
}

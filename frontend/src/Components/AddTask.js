import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(7),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "100%"
    }
}));

export default function AddTask(){
    const classes = useStyles();
    const [firstLoad, setLoad] = React.useState(true);
    const [selectedDate, setSelectedDate] = React.useState(new Date("2000-01-01T00:00:00"));
    const [task, setTask] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [completed, setCompleted] = React.useState("");

    const handleDateChange = date => setSelectedDate(date.target.value);
    const handleTaskChange = event => setTask(event.target.value);
    const handlePriorityChange = event => setPriority(event.target.value);
    const handleCompletedChange = event => setCompleted(event.target.value);

    const [message, setMessage] = React.useState("Nothing was saved");

    async function postTask(toInput){
        const response = await fetch(
            "/api/todo",
            {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(toInput)
            }
        );

        let body = await response.json();
        console.log(body.id);
        setMessage(body.id ? "Posted task successfully" : "Task was not posted");
    }

    const handleSubmit = variables => {
        const toInput = { task, priority, completed, duedate: selectedDate};
        postTask(toInput);
        setTask("");
        setPriority("");
        setCompleted("");
    };

    if(firstLoad){
        setLoad(false);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <ListAltIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Add Task
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="task"
                                value={task}
                                label="Task"
                                name="task"
                                autoComplete="task"
                                onChange={handleTaskChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="priority"
                                name="priority"
                                variant="outlined"
                                required
                                fullWidth
                                value={priority}
                                id="priority"
                                label="Priority"
                                onChange={handlePriorityChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="completed"
                                name="completed"
                                variant="outlined"
                                required
                                fullWidth
                                value={completed}
                                id="completed"
                                label="Completed"
                                onChange={handleCompletedChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="duedate"
                                type="Date"
                                required
                                fullWidth
                                className={classes.TextField}
                                InputLabelProps={{shrink: true}}
                                label="Due Date"
                                onChange={handleDateChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link to="/view">View Tasks</Link>
                        </Grid>
                    </Grid>
                </form>
                <Typography style={{ margin:7 }} variant="body1">
                    Status: {message}
                </Typography>
            </div>
        </Container>
    );

}

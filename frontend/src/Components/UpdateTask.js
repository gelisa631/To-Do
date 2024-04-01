import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 600
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: `10px`,
        height: "100%",
        width: "99%",
        marginTop: theme.spacing(7)
    },
    link: {
        color: "rgba(0,0,0,0.65)",
        textDecoration: "none",
        marginLeft: "10%",
        alignSelf: "flex-start",
        "&:hover": {
            color: "rgba(0,0,0,1)"
        }
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        minWidth: 400
    },
}));

export default function UpdateTask({...props}){
    const classes = useStyles(props);

    const [data, updateData] = React.useState([]);
    const [firstLoad, setLoad] = React.useState(true);
    let isLoading = true;
    const [id, setId] = React.useState(0);
    const [selectedDate, setSelectedDate] = React.useState(new Date("2000-01-01T00:00:00"));
    const [task, setTask] = React.useState("");
    const [priority, setPriority] = React.useState("");
    const [completed, setCompleted] = React.useState("");
    const [message, setMessage] = React.useState("Nothing was updated");

    async function getTasks() {
        let response = await fetch("/api/todo");
        let body = await response.json();
        updateData(body);
    }

    if (firstLoad){
        getTasks();
        setLoad(false);
    }

    if (data.length > 0 ){
        isLoading = false;
    }

    const handleCompletedChange = event => {
        setCompleted(event.target.value);
    }

    async function updateTask(toInput){
        const response = await fetch(
            "/api/id",
            {
                method: "PUT",
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
        setMessage(body.id ? "Updated task successfully" : "Task was not updated");
    }

    const handleSubmit = (event) => {
        const toInput = { id, task, priority, completed, duedate : selectedDate};
        updateTask(toInput);
    };

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <ListAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Update Task
            </Typography>

            { isLoading ?
                (<CircularProgress />) :
                (<TableContainer
                        style={{ width: "80%", margin: "0 10px" }}
                        component={Paper}
                    >
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Task</TableCell>
                                    <TableCell align="center">Priority</TableCell>
                                    <TableCell align="center">Completed</TableCell>
                                    <TableCell align="center">Due Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { data?.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell align="center">{row.task}</TableCell>
                                        <TableCell align="center">{row.priority}</TableCell>
                                        <TableCell align="center">
                                            <TextField
                                                autoComplete="completed"
                                                name="completed"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                defaultValue={row.completed}
                                                id="completed"
                                                onChange= {(e) => {
                                                    handleCompletedChange(e);
                                                    setId(row.id);
                                                    setTask(row.task);
                                                    setPriority(row.priority);
                                                    setSelectedDate(row.duedate);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{row.duedate}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            <Link className={classes.link} to="/">
                {" "}
                <Typography align="left">
                    Go back to Add Task
                </Typography>
                {" "}
            </Link>
            <Button

                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                Save
            </Button>
            <Typography style={{ margin:7 }} variant="body1">
                Status: {message}
            </Typography>
        </div>
    );
}

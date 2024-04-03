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
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
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
    RemoveCircleOutlineIcon:{
        color: "green"
    }
}));

export default function DeleteTask({...props}){
    const classes = useStyles(props);

    const [data, updateData] = React.useState([]);
    const [firstLoad, setLoad] = React.useState(true);
    let isLoading = true;
    const [message, setMessage] = React.useState("Nothing was deleted");

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

    async function deleteTask(toDelete){
        const response = await fetch(
            "/api/task/" + toDelete,
            {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(toDelete)

            }
        );

        let body = await response.text();
        setMessage(body ? "Task was deleted successfully" : "Task was not deleted");
        getTasks();
    }

    const handleSubmit = (e) => {
        const toDelete = e.currentTarget.getAttribute('id');
        deleteTask(toDelete);
    };

    return (
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <ListAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Task List
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
                                    <TableCell align="center">Remove</TableCell>
                                    <TableCell align="center">Task</TableCell>
                                    <TableCell align="center">Priority</TableCell>
                                    <TableCell align="center">Completed</TableCell>
                                    <TableCell align="center">Due Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { data?.map(row => (
                                    <TableRow key={row.task}>
                                        <TableCell align="center">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.submit}
                                                id={row.id}
                                                onClick={handleSubmit}
                                            >
                                                <RemoveCircleOutlineIcon/>
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">{row.task}</TableCell>
                                        <TableCell align="center">{row.priority}</TableCell>
                                        <TableCell align="center">{row.completed}</TableCell>
                                        <TableCell align="center">{row.duedate}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
            }
            <Typography style={{ margin:7 }} variant="body1">
                Status: {message}
            </Typography>
            <Link className={classes.link} to="/">
                {" "}
                <Typography align="left">
                    Add Task
                </Typography>
                {" "}
            </Link>
            <Link className={classes.link} to="/update">
                {" "}
                <Typography align="left">
                    Update Task
                </Typography>
                {" "}
            </Link>
        </div>
    );
}

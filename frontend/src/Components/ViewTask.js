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
    }
}));

export default function ViewTask({...props}){
    const classes = useStyles(props);

    const [data, updateData] = React.useState([]);
    const [firstLoad, setLoad] = React.useState(true);
    let isLoading = true;

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
                                <TableCell align="center">Task</TableCell>
                                <TableCell align="center">Priority</TableCell>
                                <TableCell align="center">Completed</TableCell>
                                <TableCell align="center">Due Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { data?.map(row => (
                                <TableRow key={row.task}>
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
            <Link className={classes.link} to="/">
                {" "}
                <Typography align="left">
                    Go back to Add Task
                </Typography>
                {" "}
            </Link>
        </div>
    );
}

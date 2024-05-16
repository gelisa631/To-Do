import {Drawer, List, ListItem, ListItemText} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router";

const useStyles = makeStyles({
    drawer: {
        width: '600'
    }
});

const drawerWidth = 600;

const SideDrawer = () => {
    const classes = useStyles();
    let navigate = useNavigate();

    const linkList = [
        {
            text: 'Home',
            onClick: () => navigate('/'),
        },
        {
            text: 'Add Task',
            onClick: () => navigate('/add'),
        },
        {
            text: 'Update Task',
            onClick: () => navigate('/update'),
        },
        {
            text: 'Delete Task',
            onClick: () => navigate('/delete'),
        },
    ];
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
        >
            <List>
                {linkList.map((item, index) => {
                    const { text, onClick } = item;
                    return (
                        <ListItem button key={text} onClick={onClick}>
                            <ListItemText primary={text} />
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

export default SideDrawer;

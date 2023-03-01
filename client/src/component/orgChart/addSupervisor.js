import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Box } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete } from "@mui/material";
import SearchSupervisor from "./SearchSupervisor";
import { height, style } from "@mui/system";

export default function AddSupervisor(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        props.fetchUsers("");
        setOpen(true);
    };

    const handleClose = () => {
        props.fetchUsers("");

        setOpen(false);
    };

    const handleOpen = () => {
        props.fetchUsers("");
        props.addSupervisor();
        setOpen(false);
    };

    return (
        <Box
            height="100%"
            width="100%"
            display="flex"
            flexDirection="column"
            m={1}
            justifyContent="center"
            alignItems="center"
        >
            <div>
                Selected user don’t have supervisor please click on the add
                supervisor button to add the supervisor to the selected user
            </div>
            <>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Supervisor
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Supervisor</DialogTitle>
                    <DialogContent>
                        <SearchSupervisor
                            fetchUsers={props.fetchUsers}
                            userList={props.userList}
                            selectSupervisor={props.selectSupervisor}
                            loader={props.loader}
                        />
                        {/* <div>Label: {JSON.stringify(props.userForAddingSupervisor.label)}</div>
                    <div>Id: {JSON.stringify(props.userForAddingSupervisor.id)}</div> */}
                        <div>
                            You are updating supervisor of{" "}
                            {JSON.stringify(
                                props.userForAddingSupervisor?.label,
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOpen}>Add</Button>
                    </DialogActions>
                </Dialog>
            </>
        </Box>
    );
}

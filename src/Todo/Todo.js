import React, { useState } from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import db from "../Firebase/firebase";
import firebase from "firebase";
import randomColor from "randomcolor";
import "./Todo.css";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height :200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "strech",
    justifyContent:"space-between"
  },
}));

function Todo({ todo }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [modalStyle] = useState(getModalStyle);
  const color = randomColor();
  const handleUpdate = () => {
    db.collection("todos").doc(todo.id).set(
      {
        todo: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        className="todo__modal"
      >
        <form className={classes.paper} style={modalStyle}>
          <h2 style={{textAlign: "center"}}>Edit Todo Item</h2>
          <TextField
            disabled
            id="standard-disabled"
            label="Current Todo Item"
            defaultValue={todo.todo}
          />
          <TextField
            id="standard-password-input"
            label="New Todo Item"
            type="text"
            autoComplete="current-password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            onClick={handleUpdate}
          >
            Update Todo
          </Button>
        </form>
      </Modal>
      <div className="todo__list" style={{ backgroundColor: color }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssignmentIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={todo.todo}
            secondary={todo.timestamp ? todo.timestamp.toDate().toString() : ""}
          />
        </ListItem>
        <div className="todo__icons">
          <EditIcon onClick={(e) => setOpen(true)} />
          <DeleteIcon
            onClick={(event) => db.collection("todos").doc(todo.id).delete()}
          />
        </div>
      </div>
    </>
  );
}

export default Todo;

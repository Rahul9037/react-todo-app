import React from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Button } from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import db from '../Firebase/firebase';
import './Todo.css';

function Todo({todo}) {
  
  return (
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssignmentIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={todo.todo} secondary={todo.timestamp ? todo.timestamp.toDate().toString() : ''} />
        </ListItem>
        <DeleteIcon onClick={event => db.collection('todos').doc(todo.id).delete()}/>
      </List>
  );
}

export default Todo;

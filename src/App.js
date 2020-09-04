import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import db from './Firebase/firebase';
import Todo from './Todo/Todo';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => { 
    const unsubscribe = db.collection('todos').orderBy('timestamp','desc')
                        .onSnapshot( snapShot => 
                          setTodos(snapShot.docs.map(
                            doc => ({
                              id : doc.id,
                              todo : doc.data().todo,
                              timestamp : doc.data().timestamp
                            })
                          )))
    return () => {
      unsubscribe();
    }
  }, [])

  const addTodo = (e) => {
    console.log(todos)
    e.preventDefault();
    db.collection('todos').add({
      todo : input,
      timestamp : firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }



  return (
    <div className="App">
      <h1>Hii React!!!</h1>
      <form>
        <FormControl>
          <InputLabel><span role="img" aria-label="">&#9989;</span> Write a Todo</InputLabel>
          <Input type="text" value={input} onChange={(e) => (setInput(e.target.value))} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>
          Add Todo
      </Button>
      </form>
      <ul>
        {
          todos.map(todo => {
            return <Todo key={todo.id} todo={todo}/>
          })
        }
      </ul>
    </div>
  );
}

export default App;

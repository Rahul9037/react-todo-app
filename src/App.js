import React,{ useState } from 'react';
import './App.css';

function App() {
  const [todos,setTodos] = useState(['1','2','3']);
  const [input,setInput] = useState('');
  const addTodo = (e) => {
    e.preventDefault();
    setTodos([...todos , input]);
    setInput('');
  }
  return (
    <div className="App">
     <h1>Hii React!!!</h1>
      <form>
      <input type="text" value={input} onChange={ (e) => (setInput(e.target.value))}/>
      <button type="submit" onClick={addTodo}>Add Todo</button>
      </form>
      <ul>
        {
          todos.map( todo => {
            return <li>{todo}</li>
          })
        }
      </ul>
    </div>  
  );
}

export default App;

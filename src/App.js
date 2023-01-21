import './App.css';
import Todo from './components/Todo';
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route, json} from 'react-router-dom'
import Edit from './Pages/Edit';


function App() {
  const [inputText,setInputText] = useState(""); //controlled input text
  const [todos,setTodos] = useState(function(){return JSON.parse(localStorage.getItem('todos')) || []});//current todos + setTodos
  const [currentTodos,setCurrentTodos]  = useState(function(){return JSON.parse(localStorage.getItem('todosCount')) || 0})

  function deleteTodo(idDelete){
    const filteredTodos = todos.filter(todo=>{
      return todo.id!=idDelete;
    })
    setCurrentTodos(prevCount=>prevCount-1)
    setTodos(filteredTodos);
  }
  return (
  <Router>
      <div className="App h-[100vh] w-[100vw] flex items-center justify-center bg-darkColor">
        <Routes>
          <Route path='/' element={<MainTodo inputText={inputText} deleteTodo={deleteTodo} currentTodos={currentTodos} setCurrentTodos={setCurrentTodos} setInputText={setInputText} setTodos={setTodos} todos={todos}/>}/>
          <Route path='/edit/:id' element={<Edit todos={todos} setTodos={setTodos}/>}/>
        </Routes>
      </div>
  </Router>
  )
}

function MainTodo(props){
  const {inputText, deleteTodo, currentTodos, setCurrentTodos, setInputText, setTodos, todos}=props;
  return (
    <Todo inputText={inputText} deleteTodo={deleteTodo} currentTodos={currentTodos} setCurrentTodos={setCurrentTodos} setInputText={setInputText} setTodos={setTodos} todos={todos}/>
  );
}

export default App;

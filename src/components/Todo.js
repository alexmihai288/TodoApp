import React, { useEffect } from 'react'
import Task from './Task'
import { nanoid } from 'nanoid';
import { json } from 'react-router';

const Todo = (props) => {
  const {inputText, setInputText, setTodos, todos, setCurrentTodos, currentTodos,deleteTodo} = props;

  function updateText(e){
    setInputText(e.target.value);
  }
  function addTodo(){
    if(inputText.trim()!==''){
        const newTodo = {
            id:nanoid(),
            todoValue:inputText
        }
        setTodos(prevTodos=>[...prevTodos,newTodo]);
        setCurrentTodos(prevCount=>prevCount+1);
        setInputText('');
    }
 
  }

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
    localStorage.setItem('todosCount',JSON.stringify(currentTodos));
  },[todos]);
  
  const jsxTodos = todos.map(todo=><Task todo={todo.todoValue} key={todo.id} id={todo.id} deleteTodo={deleteTodo}/>)
  
  return (
    <div className='todoContainer bg-whiteColor rounded-t-md w-[100%] max-w-[350px]'>
        <div className='todoHeaderContainer px-2 py-1'>
            <div className="flex items-center justify-between">
                <h1 className='font-bold text-[25px] text-darkColor'>Todo App</h1>
                <div className='menu cursor-pointer'>
                    <div className='w-[16px] h-[3.21px] bg-darkColor mb-1'></div>
                    <div className='w-[16px] h-[3.21px] bg-darkColor mb-1'></div>
                    <div className='w-[16px] h-[3.21px] bg-darkColor'></div>
                </div>
            </div>
            <div className='mt-8 inputContainer flex items-center border-darkColor border-b space-x-3'>
                <input type="text" onChange={updateText} value={inputText} placeholder="What's planned for today ?" className='px-1 w-[100%] bg-transparent  outline-none'/>
                <i className="bi bi-send-fill cursor-pointer" onClick={addTodo}></i>
            </div>
        </div>
        <div className='todoBodyContainer bg-[#d4d4d4] px-2 py-1'>
            <div className='tasksInfo'>
                <p className='text-center mt-3 mb-4'>current tasks ({currentTodos})</p>
            </div>
            <div className='taskList flex flex-col gap-[30px]'>
                {jsxTodos}
            </div>
        </div>
    </div>
  )
}

export default Todo
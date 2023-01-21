import React from 'react'
import { useParams } from 'react-router'
import { Link,useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { wait } from '@testing-library/user-event/dist/utils';

const Edit = (props) => {
  const {todos,setTodos}=props;
  const {id}=useParams();
  const selectedItems = todos.filter(todo=>todo.id===id)
  const selectedItem = selectedItems[0];

  const [editTodo, setEditTodo] = useState("")
  const [editStatus,setEditStatus] = useState(false);
  const [isShowStatus,setShowStatus] = useState(false);

  function validateEdit(){
   setShowStatus(true);
    if(editTodo.trim()==='')
      setEditStatus(false);
    else{
      setEditStatus(true);
      goToHome();
      setTodos(prevTodos=>{
        return prevTodos.map(todo=>{
          return {
            ...todo,
            todoValue: id===todo.id ? editTodo:todo.todoValue
          }
        })
      })
    }
  }
  const navigate = useNavigate()

  async function goToHome(){
    await wait(2000);
    navigate('/');
  }
  function handleInput(e){
    setEditTodo(e.target.value)
  }

  useEffect(()=>{
    setTimeout(()=>{
      setShowStatus(false);
    },2000);
  },[isShowStatus]);
  
  return (
    <div className='editContainer bg-whiteColor rounded-t-md w-[100%] max-w-[350px] px-2 py-1'>
        <div className='editHeader mb-12 flex items-center justify-between'>
          <h1 className='text-[22px] font-bold'>Edit your task</h1>
          <Link to="/" className='flex flex-col items-center cursor-pointer'>
            <i className="bi bi-caret-left-fill"></i>
            <p className="text-[12px] -mt-[5px]">go back</p>
          </Link>
        </div>
        <div className='editBody space-y-5 pb-4'>
          <div className='space-y-2'>
            <p className='text-[16px]'> Current Task : </p>
            <input value={selectedItem.todoValue} className="bg-[#e7e7e7] w-[100%] py-1 px-2 rounded-sm outline-none text-[#5c5c5c]" readOnly={true}/>
          </div>
          <div className='space-y-2'>
            <p className='text-[16px]'> Edit Task : </p>
            <input onChange={handleInput} value={editTodo} type="text" className='w-[100%] outline-none py-1 px-2' autoFocus={true}/>
          </div>
          <div className='editControl flex items-center justify-center gap-6'>
            <button onClick={validateEdit} className="bg-green-700 text-white px-4 py-1 rounded-full active:bg-green-800 duration[.20s]">Save</button>
            <Link to="/" className="bg-red-700 text-white px-4 py-1 rounded-full active:bg-red-800 duration[.20s]">Cancel</Link>
          </div>
          {
            isShowStatus &&
            <div className='todoEditStatus'><p>{editStatus ? "Todo was updated successfully !":"You must enter some characters !"}</p></div>
          }
        </div>
    </div>
  )
}

export default Edit
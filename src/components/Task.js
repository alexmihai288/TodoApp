import React from 'react'
import Todo from './Todo';
import { Link } from 'react-router-dom';

const Task = (props) => {
  const {todo, id, deleteTodo} = props;
 
  return (
    <div className='task bg-whiteColor p-2 rounded-md flex items-center justify-between'>
        <p className='taskValue font-medium'>{todo}</p>
        <div className='taskOptions flex items-center gap-[20px]'>
            <Link to={`/edit/${id}`} className="bi bi-pencil-square cursor-pointer text-[18px] text-green-700"></Link>
            <i className="bi bi-trash2-fill cursor-pointer text-[18px] text-red-700" onClick={()=>deleteTodo(id)}></i>
        </div>
    </div>
  )
}

export default Task
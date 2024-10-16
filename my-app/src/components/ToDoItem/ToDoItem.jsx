import React from 'react'
import style from './ToDoItem.module.css'
import { MdDelete } from "react-icons/md";

const ToDoItem = ({tast, isChecked, isChackedInput, index, deleteTask, id}) => {
  return (
    <div className={style.main}>
    <div className={style.boxItem} >
      <input type='checkbox' checked={isChecked}  onClick={() => isChackedInput(index)}/>
      <span className={isChecked? style.name: style.namefalse}>{tast}</span>
      <button className={style.buttonDelete} onClick={()=> deleteTask(id)}><MdDelete className={style.delete} /></button>
    </div>
    </div>

  )
}

export default ToDoItem

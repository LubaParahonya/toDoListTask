import React, { useEffect, useState } from 'react'
import ToDoItem from '../ToDoItem/ToDoItem'
import style from './Todo.module.css'



const Todo = () => {
    const [tast, setNameTask] = useState()
    const [listToDo, setListToDo] = useState([])
    const [done, setDone] = useState("All")
    let currentList = listToDo
   
    const getApiData = async () => {
        try{
          const response = await fetch('https://lubaparahonya.github.io/todolist/list.json')
          .then((response) => response.json());
          localStorage.setItem('list', JSON.stringify(response))
          setListToDo(JSON.parse(localStorage.getItem('list')))
          console.log(response)
        }catch(error){
          console.log(error);
        }
      };
    
    useEffect(()=>{
        getApiData()
    }, [], listToDo);


    const addToDoHendler = e => {
        if(e.key === 'Enter'){
            e.preventDefault(tast)
            setListToDo([{id: listToDo.length + 1,
                                       tast,
                                       isChecked: false}, ...listToDo])
            localStorage.setItem('list', JSON.stringify(listToDo))
            setNameTask('')
        }
    }
    const isChackedInput = (index) => {
        const newList  = [].concat(listToDo)
        newList[index].isChecked = !newList[index].isChecked
        setListToDo(newList)
        

    }
    const deleteTask = (id) => {
        const newList = listToDo.filter(el => el.id !== id)
        setListToDo(newList)
        console.log('удалили', id)
        console.log('newList', newList)
        console.log('listToDo',listToDo)
    }

    switch(done){
        case "All":
        currentList = listToDo
        break;
        case"Active":
        currentList = listToDo.filter(el => el.isChecked === false)
        break;
        case"Completes":
        currentList = listToDo.filter(el => el.isChecked === true)
        break;
        default:
        break;
    }
  return (
    <div className={style.mainBox}>
        <div className={style.blockButton}>
            <input type='text'
                   value={tast} 
                   onChange={e=> setNameTask(e.target.value)}
                   placeholder='Напиши новую задачу'
                   onKeyPress={addToDoHendler}
                   className={style.inputTask}/>
            <div className={style.text}>Список задач</div>
            <div className={style.category}>
            <button className={style.buttonCategory} onClick={()=> setDone("All")}>Все</button>
            <button className={style.buttonCategory} onClick={()=> setDone("Active")}>Активне</button>
            <button className={style.buttonCategory} onClick={()=> setDone("Completes")}>Выполненые</button>
            </div>   
            </div>
        <div className={style.boxList}> 
            <div className={style.imageListToDo}></div>
            <div className={style.list}>
            {currentList ? currentList.map((toDo, index) => <ToDoItem id={toDo.id}
         tast={toDo.tast} 
         isChecked={toDo.isChecked} 
         isChackedInput={isChackedInput} 
         index={index}
         deleteTask={deleteTask}
         key={toDo.id}/>) : null}
            </div>
        </div>
    </div>
  )
}

export default Todo

import { TodoListPropsType, TasksType } from "../../Types" 
import { v4 as uuid } from 'uuid';
import { AddItemInput } from "../Inputs/AddItemInput";
import { useState } from "react";


export function TodoList ({
  todolistId,
  title,
  tasks,
  onRemoveTaskHandler,
  onFilterHandler,
  filter,
  onChangeCheckedHandler,
  onAddTaskHandler,
  onRemoveTodoList,
  onChangeTaskTitle
  }: TodoListPropsType ){

  
  const [tLTitleEditMode, setTLTitleEditMode] = useState<boolean>(false)
  const [tlTitle, setTLTitle] = useState<string>(title)
  
  const taskList = tasks.map((task: TasksType ) => {
    
     const setNewTitle = (title:string) => {
        onChangeTaskTitle(title,todolistId, task.id)
     }

    return <li 
        className={task.isDone ? "blur_active_task": ""} 
        key={task.id}>
          <label> 
            <input 
              onChange={()=>{onChangeCheckedHandler(!task.isDone, task.id, todolistId)}}
              type="checkbox" checked={task.isDone}
            />
             <TaskTitle title={task.title} setNewTitle={setNewTitle} />
          </label> 
          <button onClick={() => {onRemoveTaskHandler(task.id, todolistId)}} >x</button> </li>
  })


    
    const addItem = (value: string) =>{
      onAddTaskHandler({id: uuid(), isDone: false, title: value }, todolistId)
      console.log("value",value)
    }
    


    return (
      <div style={{border: "1px solid black"}}> 
          <div> 
            {!tLTitleEditMode && <span onDoubleClick={() => setTLTitleEditMode(true)}>{tlTitle}</span> }
            {tLTitleEditMode && <input autoFocus value={tlTitle} 
                onBlur={() => {setTLTitleEditMode(false)}} 
                onKeyDown={(e) => {
                  if(e.key === "Enter"){
                    setTLTitleEditMode(false)
                  }
                }} 
                onChange={(e) => {setTLTitle(e.target.value)}} /> }
            <button onClick={() => {onRemoveTodoList(todolistId)}}>x</button> 
            
          </div>
          
          <AddItemInput addItem={addItem}/>
          <ul>
            {taskList}
          </ul>
          <div>
            <button style={{background: filter === "ALL" ? "blue" : "white" }} onClick={() => {onFilterHandler("ALL",todolistId)}}>All</button>
            <button style={{background: filter === "COMPLETED" ? "blue" : "white" }} onClick={() => {onFilterHandler("COMPLETED",todolistId)}} >Completed</button>
            <button style={{background: filter === "ACTIVE" ? "blue" : "white" }} onClick={() => {onFilterHandler("ACTIVE",todolistId)}}>Active</button>
          </div>
  
      </div>
    )
  }


type TaskTitlePropsType = {
  title: string;
  setNewTitle:(title: string) => void
}
 
function TaskTitle({title, setNewTitle}: TaskTitlePropsType ){

  const [taskTitleEditMode, setTaskTitleEditMode] = useState<boolean>(false)
  const [value, setValue] = useState<string>(title)
  
  return (
    <>
      {!taskTitleEditMode && <span onDoubleClick={() => {setTaskTitleEditMode(true)}} > {value} </span>}
      {taskTitleEditMode && <input autoFocus value={value} 
                onBlur={() => {
                  setTaskTitleEditMode(false)
                  setNewTitle(value)
                }} 
                onKeyDown={(e) => {
                  if(e.key === "Enter"){
                    setNewTitle(value)
                    setTaskTitleEditMode(false)
                  }
                }} 
                onChange={(e) => {setValue(e.target.value)}} /> 
      }
    </>
  )

}
  
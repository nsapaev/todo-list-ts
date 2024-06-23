
import { useState } from "react"
import { TodoListPropsType, TasksType } from "../../Types" 
import { v4 as uuid } from 'uuid';

export function TodoList ({
  title,
  tasks,
  onRemoveTaskHandler,
  onFilterHandler,
  filter,
  onChangeCheckedHandler,
  onAddTaskHandler
  }: TodoListPropsType ){

  
  const taskList = tasks.map((task: TasksType ) => {
    return <li key={task.id}><label> <input onChange={()=>{onChangeCheckedHandler(!task.isDone, task.id)}} type="checkbox" checked={task.isDone} /> <span> {task.title} </span> </label> <button onClick={() => {onRemoveTaskHandler(task.id)}} >x</button> </li>
  })
    const [addTaskInputValue , setAddTaskInputValue] = useState<string>("")

    const addTask = (task:TasksType) => {
      onAddTaskHandler(task)
      setAddTaskInputValue("")
    }

    return (
      <div style={{border: "1px solid black"}}> 
          <div> {title} </div>
          <div>
              <input 
                type="text" 
                value={addTaskInputValue} 
                onChange={(e) => {setAddTaskInputValue(e.target.value)}} 
                onKeyDown={(e) => { 
                  if(e.key === "Enter"){
                    addTask({id: uuid(),  title: addTaskInputValue, isDone: false })
                  } 
                }}/> 
              <button onClick={() => {addTask({id: uuid(), title: addTaskInputValue,  isDone: false,}) }}>+</button>
          </div>
          <ul>
            {taskList}
          </ul>
          <div>
            <button style={{background: filter === "ALL" ? "blue" : "white" }} onClick={() => {onFilterHandler("ALL")}}>All</button>
            <button style={{background: filter === "COMPLETED" ? "blue" : "white" }} onClick={() => {onFilterHandler("COMPLETED")}} >Completed</button>
            <button style={{background: filter === "ACTIVE" ? "blue" : "white" }} onClick={() => {onFilterHandler("ACTIVE")}}>Active</button>
          </div>
  
      </div>
    )
  }
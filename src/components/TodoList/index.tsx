
import { useState,ChangeEvent } from "react"
import { TodoListPropsType, TasksType } from "../../Types" 
import { v4 as uuid } from 'uuid';

export function TodoList ({
  todolistId,
  title,
  tasks,
  onRemoveTaskHandler,
  onFilterHandler,
  filter,
  onChangeCheckedHandler,
  onAddTaskHandler
  }: TodoListPropsType ){

  
  const taskList = tasks.map((task: TasksType ) => {
    return <li 
        className={task.isDone ? "blur_active_task": ""} 
        key={task.id}>
          <label> 
            <input 
              onChange={()=>{onChangeCheckedHandler(!task.isDone, task.id, todolistId)}}
              type="checkbox" checked={task.isDone}
            />
              <span> {task.title} </span> 
          </label> 
          <button onClick={() => {onRemoveTaskHandler(task.id, todolistId)}} >x</button> </li>
  })

    const [addTaskInputValue , setAddTaskInputValue] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

    const addTask = (task:TasksType, todolistId: string) => {
      if(addTaskInputValue.trim() === ""){
        setError(true)
        return
      }
      onAddTaskHandler(task,todolistId)
      setAddTaskInputValue("")
    }

    const onChangeAddNewTaskInput = (e:ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setAddTaskInputValue(e.target.value)
    }

    return (
      <div style={{border: "1px solid black"}}> 
          <div> {title} </div>
          <div>
              <input 
                className={error? "error" : "" }
                type="text" 
                value={addTaskInputValue} 
                onChange={onChangeAddNewTaskInput} 
                onKeyDown={(e) => { 
                  if(e.key === "Enter"){
                    addTask({id: uuid(),  title: addTaskInputValue, isDone: false },todolistId )
                  } 
                }}/> 
              <button onClick={() => {addTask({id: uuid(), title: addTaskInputValue,  isDone: false}, todolistId) }}>+</button>
              {error && <div className="error_message">Field is required </div>}
          </div>
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
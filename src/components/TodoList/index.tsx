import { TodoListPropsType, TasksType } from "../../Types" 
import { v4 as uuid } from 'uuid';
import { AddItemInput } from "../Inputs/AddItemInput";
import {EditableTitle} from "../EditableTitle"

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
  onChangeTaskTitle,
  onChangeTodoListTitle,
  }: TodoListPropsType ){

  
  
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
             <EditableTitle title={task.title} setNewTitle={setNewTitle} />
          </label> 
          <button onClick={() => {onRemoveTaskHandler(task.id, todolistId)}} >x</button> </li>
  })


    const addItem = (value: string) =>{
      onAddTaskHandler({id: uuid(), isDone: false, title: value }, todolistId)
      console.log("value",value)
    }
    
    const  editTodoListTitl = (title: string) => {
      onChangeTodoListTitle(todolistId, title)
    }


    return (
      <div style={{border: "1px solid black"}}> 
          <div> 
            <b><EditableTitle title={title} setNewTitle={editTodoListTitl}/></b>
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


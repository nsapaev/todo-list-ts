import { TodoListPropsType, TasksType } from "../../Types" 
import { v4 as uuid } from 'uuid';
import { AddItemInput } from "../Inputs/AddItemInput";
import {EditableTitle} from "../EditableTitle"
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
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
            <Checkbox
              color="success"
              onChange={()=>{onChangeCheckedHandler(!task.isDone, task.id, todolistId)}}
              checked={task.isDone}
            />
             <EditableTitle title={task.title} setNewTitle={setNewTitle} />
          </label> 
          <IconButton onClick={() => {onRemoveTaskHandler(task.id, todolistId)}} aria-label="delete" size="large">
            <DeleteIcon />
          </IconButton>
          </li>
  })


    const addItem = (value: string) =>{
      onAddTaskHandler({id: uuid(), isDone: false, title: value }, todolistId)
      console.log("value",value)
    }
    
    const  editTodoListTitl = (title: string) => {
      onChangeTodoListTitle(todolistId, title)
    }


    return (
      <Box
      my={4}
      display="block"
      alignItems="center"
      gap={4}
      p={2}
      sx={{ border: '2px solid lightgray' }
    }
    > 
          <div> 
            <b><EditableTitle title={title} setNewTitle={editTodoListTitl}/></b>
            <Button  variant="contained" size="small" color="error" onClick={() => {onRemoveTodoList(todolistId)}}>x</Button> 
            
          </div>
          
          <AddItemInput addItem={addItem} label="Add task"/>
          <ul>
            {taskList}
          </ul>
          <div >
            <Button variant={filter === "ALL" ? "contained" : "text"} color="inherit" onClick={() => {onFilterHandler("ALL",todolistId)}}>All</Button>
            <Button variant={filter === "COMPLETED" ? "contained" : "text"} color="inherit"  onClick={() => {onFilterHandler("COMPLETED",todolistId)}} >Completed</Button>
            <Button  variant={filter === "ACTIVE" ? "contained" : "text"} color="inherit" onClick={() => {onFilterHandler("ACTIVE",todolistId)}}>Active</Button>
          </div>
  
    </Box>
     
          
     
    )
  }


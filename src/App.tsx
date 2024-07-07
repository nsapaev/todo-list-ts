import React, { useCallback } from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType,TodoListType } from './Types';
import "./App.css"
import { AddItemInput } from './components/Inputs/AddItemInput';
import { RootState, AppDispatch} from "./state/store"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
   addTodolist, 
   addTask,
   removeTask,
   changeTaskChecked,
   changeTaskTitle,
   filterTodolistTasks,
   removeTodolist,
   changeTodolistTitle
  } from './state/todolist-slice';
import { Button } from '@mui/material';
    
  


function App() {

  // hooks
  const dispatch = useDispatch<AppDispatch>()
  const todolists = useSelector<RootState, Array<TodoListType>>(state => state.todolist)
  console.log("Called App")
  
    // Functions 
    const onAddTaskHandler = useCallback((task: TasksType, todolistId: string) => {
        const actioon = {
          task,
          todolistId
        }
        dispatch(addTask(actioon))
    }, [dispatch])   
    const onRemuveTaskHandler = useCallback ((taskId: string, todolistId: string) => {
      const action = {
        todolistId,
        taskId
      }
      dispatch(removeTask(action))
    }, [dispatch])
    const onChangeCheckedHandler = useCallback ((value:boolean, id: string, todolistId:string) => {
        const action = {
          isChecked: value,
          todolistId,
          taskId: id
        }
        
        dispatch(changeTaskChecked(action))
    }, [dispatch])
    const onChangeTaskTitleHandler = useCallback ((title:string, todolistId:string, taskId: string) => {
      const action = {
        title,
        todolistId,
        taskId
      }
      dispatch(changeTaskTitle(action))
    }, [dispatch])
    const onFilterHandler = useCallback ((filter: FilteredValueType, todolistId: string) => {
        const action = {
          filter,
          todolistId
        }
        dispatch(filterTodolistTasks(action))
    }, [dispatch])
    const onAddTodoListHandler = useCallback( (title: string) => {
        dispatch(addTodolist({title}))
    }, [dispatch])
    const onRemoveTodoListHandler = useCallback ((todolistId: string) => {
        const action = {
          todolistId
        }
        dispatch(removeTodolist(action))
    }, [dispatch])
    const onChangeTodoListTitleHandler = useCallback ( (todolistId:string, title: string) => {
        const action = {
          todolistId,
          title
        }
        dispatch(changeTodolistTitle(action))
    }, [dispatch])

  return (
    <div className="App">
        <input type='email' autoComplete='username'/>

        <button> focus visible</button>
      <form action="">

      </form>
      
      <div><AddItemInput addItem={onAddTodoListHandler} label="Add TodoList" /></div>

      {todolists.map((tl:TodoListType ) => {

        return  <TodoList
                    key={tl.id}
                    todoList={tl}
                    todolistId={tl.id} 
                    title={tl.title} 
                    onRemoveTaskHandler={onRemuveTaskHandler}
                    onChangeCheckedHandler={onChangeCheckedHandler}
                    onFilterHandler={onFilterHandler}
                    filter={tl.filter}
                    onAddTaskHandler={onAddTaskHandler}
                    onRemoveTodoList={onRemoveTodoListHandler}
                    onChangeTaskTitle={onChangeTaskTitleHandler}
                    onChangeTodoListTitle={onChangeTodoListTitleHandler}
                />
      })}
     
    </div>
  );
}

export default App;



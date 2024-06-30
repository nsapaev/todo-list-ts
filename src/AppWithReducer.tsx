import React from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType,TodoListType } from './Types';
import "./App.css"
import { AddItemInput } from './components/Inputs/AddItemInput';
import { RootState } from "./state/store"
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
    

function AppWiethReducer() {

  // hooks
  const dispatch = useDispatch()
  const todolists = useSelector<RootState, Array<TodoListType>>(state => state.todolist)
  
    // Functions 
    const onAddTaskHandler = (task: TasksType, todolistId: string) => {
        const actioon = {
          task,
          todolistId
        }
        dispatch(addTask(actioon))
    }    
    const onRemuveTaskHandler = (taskId: string, todolistId: string) => {
      const action = {
        todolistId,
        taskId
      }
      dispatch(removeTask(action))
    } 
    const onChangeCheckedHandler = (value:boolean, id: string, todolistId:string) => {
        const action = {
          isChecked: value,
          todolistId,
          taskId: id
        }
        
        dispatch(changeTaskChecked(action))
    }
    const onChangeTaskTitleHandler = (title:string, todolistId:string, taskId: string) => {
      const action = {
        title,
        todolistId,
        taskId
      }
      dispatch(changeTaskTitle(action))
    }
    const onFilterHandler = (filter: FilteredValueType, todolistId: string) => {
        const action = {
          filter,
          todolistId
        }
        dispatch(filterTodolistTasks(action))
    };
    const onAddTodoListHandler = (title: string) => {
        dispatch(addTodolist({title}))
    }
    const onRemoveTodoListHandler = (todolistId: string) => {
        const action = {
          todolistId
        }
        dispatch(removeTodolist(action))
    }
    const onChangeTodoListTitleHandler = (todolistId:string, title: string) => {
        const action = {
          todolistId,
          title
        }
        dispatch(changeTodolistTitle(action))
    }

  return (
    <div className="App">
      <div><AddItemInput addItem={onAddTodoListHandler} label="Add TodoList" /></div>
      {todolists.map((tl:TodoListType ) => {

          let filteredTasks = tl.tasks;

          if (tl.filter === 'ACTIVE') {
            filteredTasks = tl.tasks.filter(t => !t.isDone);
          }
          if (tl.filter === 'COMPLETED') {
            filteredTasks = tl.tasks.filter(t => t.isDone);
          }

        return  <TodoList
                    key={tl.id}
                    todolistId={tl.id} 
                    title={tl.title} 
                    tasks={filteredTasks}
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

export default AppWiethReducer;



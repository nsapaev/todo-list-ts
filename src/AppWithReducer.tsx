import React, { useEffect, useReducer, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TasksType, FilteredValueType,TodoListType } from './Types';
import "./App.css"
import { v4 as uuid } from 'uuid';
import { AddItemInput } from './components/Inputs/AddItemInput';
import Box from '@mui/material/Box';
import { todolistReducer } from './state/todolistReducer';
import {AppRootState} from "./state/store"
import {
  addTaskActionCreater,
  removeTaskActionCreater,
  removeTodolistActionCreater,
  changeTaskChekedActionCreator,
  filterTodolistTitleActionCreater,
  addTodolistActionCreater,
  changeTaskTitleActionCreater,
  changeTodolistTitleActionCreater,
  initialState
} from "./state/todolistReducer"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

    

function AppWiethReducer() {

  // hooks
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootState, Array<TodoListType>>(state => state.todolists)
  
    // Functions 
    const addTask = (task: TasksType, todolistId: string) => {
        const action = addTaskActionCreater(todolistId, task)
        dispatch(action)
    }    
    const onRemuveTask = (taskId: string, todolistId: string) => {
      const action = removeTaskActionCreater(todolistId, taskId)
      dispatch(action)
    } 
    const onChangeChecked = (value:boolean, id: string, todolistId:string) => {
        const action = changeTaskChekedActionCreator(value, todolistId,  id)
        dispatch(action)
    }
    const onFilterHandler = (filter: FilteredValueType, todolistId: string) => {
        const action = filterTodolistTitleActionCreater(todolistId ,filter)
        dispatch(action)
    };
    const addTodoList = (value: string) => {
      const action =  addTodolistActionCreater(value)
      dispatch(action )
    }
    const onRemoveTodoListHandler = (id: string) => {
        const action = removeTodolistActionCreater(id)
        dispatch(action)
    }
    const onChangeTaskTitleHandler = (title:string, todoListId:string, taskId: string) => {
        const action = changeTaskTitleActionCreater(title,todoListId, taskId)
        dispatch(action)
    }
    const onChangeTodoListTitleHandler = (id:string, title: string) => {
        const action = changeTodolistTitleActionCreater(id, title)
        dispatch(action)
    }

  return (
    <div className="App">
      <div><AddItemInput addItem={addTodoList} label="Add TodoList" /></div>
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
                    onRemoveTaskHandler={onRemuveTask}
                    onChangeCheckedHandler={onChangeChecked}
                    onFilterHandler={onFilterHandler}
                    filter={tl.filter}
                    onAddTaskHandler={addTask}
                    onRemoveTodoList={onRemoveTodoListHandler}
                    onChangeTaskTitle={onChangeTaskTitleHandler}
                    onChangeTodoListTitle={onChangeTodoListTitleHandler}
                />
      })}
     
    </div>
  );
}

export default AppWiethReducer;



import React, { useCallback, useEffect } from 'react';
import { TodoList } from '../../components/TodoList';
import { TasksType, FilteredValueType,TodoListType, UserAuthType } from '../../Types';
import { AddItemInput } from '../../components/Inputs/AddItemInput';
import { RootState, AppDispatch} from "../../state/store"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import  {useAuth} from "hooks"
import {
   addTodolist, 
   addTask,
   removeTask,
   changeTaskChecked,
   changeTaskTitle,
   filterTodolistTasks,
   removeTodolist,
   changeTodolistTitle
  } from '../../state/todolist-slice';
import { red } from '@mui/material/colors';
import { setUser } from 'state/auth-slice';
import { Password } from '@mui/icons-material';

    
  


function HomePages() {
     // hooks
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector<RootState, UserAuthType >(state => state.user)
    const todolists = useSelector<RootState, Array<TodoListType>>(state => state.todolist)
    const redirect = useNavigate()
    const auth = useAuth()
    if(!auth.isAuth){
        redirect("/register")
    }
  

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


    const onLogoutHandler = () => {
        dispatch(setUser({
            email: null,
            id: null,
            token: null
        }))
    } 
   

  return (
    <div className="App">
      <div><AddItemInput addItem={onAddTodoListHandler} label="Add TodoList" /></div>
       <div><button onClick={onLogoutHandler}> Logout</button> </div> 
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

export default HomePages;



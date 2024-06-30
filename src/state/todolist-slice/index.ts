import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TasksType, TodoListType } from "../../Types";
import {
    AddTaskType,
    AddTodolistActionType,
    ChangeTaskCheckedType,
    ChangeTaskTitleType,
    ChangeTodolistTitleActionType,
    FilterTodolistType,
    RemoveTaskType,
    RemoveTodolistActionType,
} from "./types"
import { v4 as uuid } from 'uuid';

const initialState:Array<TodoListType>   = []


const todolistsSlice = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        addTodolist: (state,{payload: {title}}: PayloadAction<AddTodolistActionType> ) => {
            const newTodoList:TodoListType = {id: uuid(), tasks:[], title: title, filter: 'ALL'} 
            return [ newTodoList, ...state ]
        },
        addTask: (state, {payload: {task,todolistId}}: PayloadAction<AddTaskType>) => {
            const newState = state.map(tl => {
                if (tl.id === todolistId) {
                    return {
                        ...tl,
                        tasks: [task, ...tl.tasks]
                    };
                }
                return tl;
            });
            return newState;
         
        },
        removeTask: (state, {payload: {taskId,todolistId}}: PayloadAction<RemoveTaskType>) => {
            const filteredTodoList = state.find(tl => tl.id === todolistId)
            if (filteredTodoList){
                const filterTasks = filteredTodoList.tasks.filter(t => t.id !== taskId)
                filteredTodoList.tasks = [...filterTasks]
            }
        },
        changeTaskChecked: (state, {payload:{isChecked,taskId,todolistId}}:PayloadAction<ChangeTaskCheckedType> ) => {
            
            const filterTodoList =  state.find(tl => tl.id === todolistId )
            if(filterTodoList){
              const resultTasks = filterTodoList.tasks.map((t: TasksType) => {
                if(t.id === taskId){
                  return { ...t, isDone: isChecked } 
                }else{
                  return { ...t }
                }}
              );
              filterTodoList.tasks = [...resultTasks]
            }
        },
        changeTaskTitle: (state, {payload: {taskId, title, todolistId}}: PayloadAction<ChangeTaskTitleType>) => {
            const neededTodolist = state.find(tl => tl.id === todolistId);
            if (neededTodolist) {
                const neededTask = neededTodolist.tasks.find(t => t.id === taskId);
                if (neededTask) {
                    neededTask.title = title;
                }
            }
        },
        filterTodolistTasks: (state, {payload:{filter,todolistId}}: PayloadAction<FilterTodolistType>) => {
            state.forEach(tl => {
                if(tl.id === todolistId){
                    tl.filter = filter
                }
            })
        },
        removeTodolist: (state, {payload:{todolistId}}: PayloadAction<RemoveTodolistActionType>) => {
            return [...state.filter(tl => tl.id !== todolistId)]
        },
        changeTodolistTitle: (state, {payload: {title,todolistId}}: PayloadAction<ChangeTodolistTitleActionType>) => {
            state.forEach(tl => {
                if(tl.id === todolistId){
                    tl.title = title
                }
            })
        }

      

    }
})

export const {addTodolist, addTask, removeTask, changeTaskChecked, changeTaskTitle, filterTodolistTasks, removeTodolist, changeTodolistTitle} = todolistsSlice.actions

export default todolistsSlice.reducer
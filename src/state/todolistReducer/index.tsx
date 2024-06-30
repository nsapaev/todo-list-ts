import React from "react"
import { TodoListType, TasksType, FilteredValueType } from "../../Types";
import { v4 as uuid } from 'uuid';
import { 
    AddTodolistActionType,
    AddTaskType,
    ChangeTaskCheckedType,
    ChangeTaskTitleType,
    ChangeTodolistTitleActionType,
    FilterTodolistType,
    RemoveTaskType,
    RemoveTodolistActionType
} from "./types"



export type ActionSType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistTitleActionType | FilterTodolistType | ChangeTaskTitleType | ChangeTaskCheckedType | RemoveTaskType | AddTaskType
 
export const initialState:  Array<TodoListType> = []

export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionSType):Array<TodoListType>  => {
    switch (action.type) {
        case "ADD-TODOLIST":
            const newTodoList:TodoListType = {id: uuid(), tasks:[], title: action.value, filter: 'ALL'} 
            return [ newTodoList, ...state ]
        case "REMOVE-TODOLIST":
            return [...state.filter(tl => tl.id !== action.id)]
        case "CHANGE-TODOLIST-TITLE":
            state.forEach(tl => {
                if(tl.id === action.id){
                    tl.title = action.title
                }
            })
            return [...state]
        case "FILTER-TODOLIST":
            state.forEach(tl => {
                if(tl.id === action.id){
                    tl.filter = action.filter
                }
            })
            return [...state]
        case "CHANGE-TASK-TITLE":
            const copyState = [...state]
            const neededTodolist = copyState.find(tl => tl.id === action.todolistId) 
            if(neededTodolist) {
              const neededTask = neededTodolist.tasks.find((t => t.id === action.taskId))
              if(neededTask){
                neededTask.title = action.title
              }
            }
            return [...copyState]
        case "CHANGE-TASK-CHECKED":
            {
            const copyState = state
            const filterTodoList =  copyState.find(tl => tl.id === action.todolistId )
            if(filterTodoList){
              const resultTasks = filterTodoList.tasks.map((t: TasksType) => {
                if(t.id === action.taskId){
                  return { ...t, isDone: action.isChecked } 
                }else{
                  return { ...t }
                }}
              );
              filterTodoList.tasks = [...resultTasks]
            }
            return [...copyState]
        }
        case "REMOVE-TASK": {
            const filteredTodoList = state.find(tl => tl.id === action.todolistId)
            if (filteredTodoList){
                const filterTasks = filteredTodoList.tasks.filter(t => t.id !== action.taskId)
                filteredTodoList.tasks = [...filterTasks]
            }
            return [...state]
        }
        case "ADD-TASK": { const newState = state.map(tl => {
            if (tl.id === action.todolistId) {
                return {
                    ...tl,
                    tasks: [action.task, ...tl.tasks]
                };
            }
            return tl;
        });
        return newState;
        }
        default:
            return state
    }
}


export const addTodolistActionCreater = (value:string): AddTodolistActionType => ({type:"ADD-TODOLIST",value} )
export const removeTodolistActionCreater = (id:string): RemoveTodolistActionType => ({type:"REMOVE-TODOLIST",id} )
export const changeTodolistTitleActionCreater = (id:string,title:string):ChangeTodolistTitleActionType => ({type: "CHANGE-TODOLIST-TITLE", id, title})
export const filterTodolistTitleActionCreater = (id:string ,filter: FilteredValueType):FilterTodolistType => ({type: "FILTER-TODOLIST", id, filter})
export const changeTaskTitleActionCreater = (title:string, todolistId: string, taskId: string):ChangeTaskTitleType => ({type: "CHANGE-TASK-TITLE", title, todolistId, taskId})
export const changeTaskChekedActionCreator = (isChecked: boolean, todolistId: string, taskId: string ): ChangeTaskCheckedType  => ({type: "CHANGE-TASK-CHECKED", isChecked, todolistId, taskId})
export const removeTaskActionCreater = (todolistId:string, taskId: string): RemoveTaskType => ({type: "REMOVE-TASK", todolistId, taskId })
export const addTaskActionCreater = (todolistId:string, task:{
    id: string,
    isDone: boolean,
    title: string,
} ): AddTaskType => ({type: "ADD-TASK", todolistId, task })

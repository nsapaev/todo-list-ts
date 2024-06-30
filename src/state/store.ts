import { createStore, combineReducers } from "redux";
import { todolistReducer } from "./todolistReducer";
import { TodoListPropsType, TodoListType } from "../Types";


const rootReducer = combineReducers({
    todolists: todolistReducer
})


export type AppRootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;


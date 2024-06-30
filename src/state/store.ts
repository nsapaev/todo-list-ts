import { configureStore } from '@reduxjs/toolkit'
import todolistsSlice from "./todolist-slice"


export const store = configureStore({
    reducer: {
        todolist: todolistsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store
import { configureStore } from '@reduxjs/toolkit'
import todolistsSlice from "./todolist-slice"
import userSlice from "./auth-slice"


export const store = configureStore({
    reducer: {
        todolist: todolistsSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store
import { Token } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAuthType } from "Types";
import { stat } from "fs";


const initialState = {
    email: null as string | null,
    token: null as string | null,
    id: null as string | null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserAuthType>){
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
        }
    }
})


export const {setUser, removeUser} = userSlice.actions 
export default userSlice.reducer
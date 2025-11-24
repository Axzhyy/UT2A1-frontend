import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAutenticated: false,
    userName: "",
    userRol: ""
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login(state, action) {
            state.isAutenticated = true
            state.userName = action.payload.userName
            state.userRol = action.payload.userRol
        },
        logout(state) {
            state.isAutenticated = false
            state.userName = ""
            state.userRol = ""
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer

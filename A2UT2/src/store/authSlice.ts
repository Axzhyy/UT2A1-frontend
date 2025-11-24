import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAutenticated: localStorage.getItem("isAutenticated") === "true",
    userName: localStorage.getItem("userName") || "",
    userRol: localStorage.getItem("userRol") || ""
}

const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        login(state, action) {
            state.isAutenticated = true
            state.userName = action.payload.userName
            state.userRol = action.payload.userRol

            localStorage.setItem("isAutenticated", "true")
            localStorage.setItem("userName", action.payload.userName)
            localStorage.setItem("userRol", action.payload.userRol)
        },
        logout(state) {
            state.isAutenticated = false
            state.userName = ""
            state.userRol = ""

            localStorage.removeItem("isAutenticated")
            localStorage.removeItem("userName")
            localStorage.removeItem("userRol")
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer

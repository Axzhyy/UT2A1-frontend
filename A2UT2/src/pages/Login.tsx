import { Box, Button, TextField, Typography, Alert } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authSlice"

export default function Login() {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)

  const bduser = "joel"
  const bdpasswd = "1234"

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (user === bduser && pass === bdpasswd) {
      dispatch(authActions.login({
        userName: user,
        userRol: "administrador"
      }))
      setError(false)
      navigate("/home")
    } else {
      setError(true)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "320px", m: "80px auto", p: 3, border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        Acceso
      </Typography>

      <TextField
        label="Usuario"
        fullWidth
        required
        value={user}
        onChange={(e) => setUser(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        required
        value={pass}
    </Box>
  )
}

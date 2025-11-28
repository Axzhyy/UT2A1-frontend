import { Box, Button, TextField, Typography, Alert } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { authActions } from "../store/authSlice"

export default function Login() {

  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user, password: pass }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(authActions.login({
          userName: data.user,
          userRol: data.role
        }))
        setError(false)
        navigate("/home")
      } else {
        setError(true)
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(true);
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
        onChange={(e) => setPass(e.target.value)}
        sx={{ mb: 2 }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Usuario o contraseña incorrectos
        </Alert>
      )}

      <Button variant="contained" type="submit" fullWidth>
        Acceder
      </Button>
    </Box>
  )
}

import { Typography, Button, Box } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/index"
import { authActions } from "../store/authSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function Home() {
  const userData = useSelector((state: RootState) => state.authentication)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate("/")
    }
  }, [userData.isAutenticated, navigate])

  const handleLogout = () => {
    dispatch(authActions.logout())
    navigate("/")
  }

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Página Home de {userData.userName}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Rol: {userData.userRol}
      </Typography>

      <Button variant="contained" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
        SALIR
      </Button>
    </Box>
  )
}

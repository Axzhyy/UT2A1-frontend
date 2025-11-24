import { Typography, Button, Box } from "@mui/material"

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

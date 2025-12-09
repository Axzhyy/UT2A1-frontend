import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"

export default function ErrorPage(){
  const error = useRouteError()

  const title = isRouteErrorResponse(error)
    ? `${error.status} – ${error.statusText}`
    : "Error inesperado"

  return (
    <Box sx={{ minHeight:"100vh", display:"grid", placeItems:"center", textAlign:"center" }}>
      <div>
        <Typography variant="h3" gutterBottom>{title}</Typography>
        <Typography sx={{ mb:2 }}>
          {isRouteErrorResponse(error) ? error.data : "Ruta no encontrada"}
        </Typography>
        <Link to="/">Volver al inicio</Link>
      </div>
    </Box>
  )
}

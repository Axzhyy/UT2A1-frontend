import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { useNavigate } from "react-router-dom";
import InformeColeccion from "../components/InformacionColeccion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 

type Item = {
  id: number;
  nombre: string;
  marca: string;
  tipo: string;
  precio: number;
};

export default function Reports() {
  const userData = useSelector((state: RootState) => state.authentication);
  const navigate = useNavigate();

  const [datosColeccion, setDatosColeccion] = useState<Item[]>([]);
  const [mostrarInforme, setMostrarInforme] = useState(false);

  // Si no estoy logueado, me voy al login
  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate("/");
    }
  }, [userData.isAutenticated, navigate]);

  const handleInformeColeccion = async () => {
    try {
      const resp = await fetch("http://localhost:3030/getItems");
      if (resp.ok) {
        const data = await resp.json();
        setDatosColeccion(data);
        setMostrarInforme(true);
      } else {
        console.error("Error en la respuesta del servidor");
      }
    } catch (err) {
      console.error("Error obteniendo datos para el informe:", err);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Cabecera con título y botón de volver */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Button variant="outlined" onClick={() => navigate("/home")}>
            {/* Si no tienes el icono instalado, quita la línea de abajo */}
            <ArrowBackIcon sx={{ mr: 1 }} /> 
            Volver
        </Button>
        <Typography variant="h4">Informes</Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          onClick={handleInformeColeccion}
          sx={{ mb: 3 }}
        >
          INFORME COLECCION
        </Button>

        {/* Renderizado condicional del informe */}
        {mostrarInforme && <InformeColeccion datos={datosColeccion} />}
      </Box>
    </Box>
  );
}
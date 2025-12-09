import {
  Typography,
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/index"
import { authActions } from "../store/authSlice"
import { useNavigate } from "react-router-dom"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PersonIcon from "@mui/icons-material/Person"

interface Item {
  id: number
  nombre: string
  marca: string
  tipo: string
  precio: number
}

export default function Home() {
  const userData = useSelector((state: RootState) => state.authentication)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [items, setItems] = useState<Item[]>([])
  const [newItem, setNewItem] = useState({
    nombre: "",
    marca: "",
    tipo: "",
    precio: "",
  })

  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate("/")
    } else {
      fetchItems()
    }
  }, [userData.isAutenticated, navigate])

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3030/getItems")
      if (response.ok) {
        const data = await response.json()
        setItems(data)
      }
    } catch (error) {
      console.error("Error fetching items:", error)
    }
  }

  const handleLogout = () => {
    dispatch(authActions.logout())
    navigate("/")
  }

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()

    const itemToSend = {
      ...newItem,
      precio: Number(newItem.precio),
    }

    try {
      const response = await fetch("http://localhost:3030/addItem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemToSend),
      })

      if (response.ok) {
        setNewItem({ nombre: "", marca: "", tipo: "", precio: "" })
        fetchItems()
      }
    } catch (error) {
      console.error("Error adding item:", error)
    }
  }

  const handleDeleteItem = async (id: number) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este artículo?")) return

    try {
      await fetch("http://localhost:3030/deleteItem", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      fetchItems()
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Cabecera con rol e icono */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4">Bienvenido, {userData.userName}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {userData.userRol === "admin" ? (
            <AdminPanelSettingsIcon color="primary" />
          ) : (
            <PersonIcon color="action" />
          )}
          <Typography variant="subtitle1">Rol: {userData.userRol}</Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            SALIR
          </Button>
        </Box>
      </Box>

      {/* Botón de informes solo para admin */}
      <Box sx={{ mb: 3 }}>
        {userData.userRol === "admin" && (
          <Button variant="outlined" onClick={() => navigate("/reports")}>
            Ir a informes
          </Button>
        )}
      </Box>

      {/* Formulario de inserción */}
      <Box
        component="form"
        onSubmit={handleAddItem}
        sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}
      >
        <TextField
          label="Nombre"
          value={newItem.nombre}
          onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
          required
        />
        <TextField
          label="Marca"
          value={newItem.marca}
          onChange={(e) => setNewItem({ ...newItem, marca: e.target.value })}
          required
        />
        <TextField
          label="Tipo"
          value={newItem.tipo}
          onChange={(e) => setNewItem({ ...newItem, tipo: e.target.value })}
          required
        />
        <TextField
          label="Precio"
          type="number"
          value={newItem.precio}
          onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Añadir
        </Button>
      </Box>

      {/* Tabla: borrar solo admin */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Marca</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
              </TableCell>
              <TableCell>
                <strong>Precio</strong>
              </TableCell>
              {userData.userRol === "admin" && (
                <TableCell>
                  <strong>Acciones</strong>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{Number(item.precio).toFixed(2)} €</TableCell>
                {userData.userRol === "admin" && (
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

import { Typography, Button, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "../store/index"
import { authActions } from "../store/authSlice"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const userData = useSelector((state: RootState) => state.authentication)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [items, setItems] = useState<any[]>([])
  const [newItem, setNewItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })

  useEffect(() => {
    if (!userData.isAutenticated) {
      navigate("/")
    } else {
      fetchItems()
    }
  }, [userData.isAutenticated, navigate])

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3030/getItems')
      const data = await response.json()
      setItems(data)
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
    try {
      const response = await fetch('http://localhost:3030/addItem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      })
      if (response.ok) {
        setNewItem({ nombre: '', marca: '', tipo: '', precio: '' })
        fetchItems()
      }
    } catch (error) {
      console.error("Error adding item:", error)
    }
  }

  const handleDeleteItem = async (id: number) => {
    try {
      await fetch('http://localhost:3030/deleteItem', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      fetchItems()
    } catch (error) {
      console.error("Error deleting item:", error)
    }
  }

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Bienvenido, {userData.userName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="subtitle1">Rol: {userData.userRol}</Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            SALIR
          </Button>
        </Box>
      </Box>

      <Box component="form" onSubmit={handleAddItem} sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField label="Nombre" value={newItem.nombre} onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })} required />
        <TextField label="Marca" value={newItem.marca} onChange={(e) => setNewItem({ ...newItem, marca: e.target.value })} required />
        <TextField label="Tipo" value={newItem.tipo} onChange={(e) => setNewItem({ ...newItem, tipo: e.target.value })} required />
        <TextField label="Precio" type="number" value={newItem.precio} onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })} required />
        <Button type="submit" variant="contained" color="primary">Añadir</Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Marca</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.marca}</TableCell>
                <TableCell>{item.tipo}</TableCell>
                <TableCell>{item.precio} €</TableCell>
                <TableCell>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteItem(item.id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

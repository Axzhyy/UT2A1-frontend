const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 3030;

app.use(cors());
app.use(express.json());

// Login Endpoint
app.post('/login', async (req, res) => {
    const { user, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE login = ? AND password = ?', [user, password]);
        if (rows.length > 0) {
            const usuario = rows[0];
            res.json({ success: true, user: usuario.nombre, role: usuario.rol });
        } else {
            res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Get Items Endpoint
app.get('/getItems', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM coleccion');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al obtener datos' });
    }
});

// Add Item Endpoint
app.post('/addItem', async (req, res) => {
    const { nombre, marca, tipo, precio } = req.body;
    try {
        const [result] = await db.query('INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)', [nombre, marca, tipo, precio]);
        res.json({ success: true, id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al insertar datos' });
    }
});

// Delete Item Endpoint
app.delete('/deleteItem', async (req, res) => {
    const { id } = req.body;
    try {
        await db.query('DELETE FROM coleccion WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error al eliminar datos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

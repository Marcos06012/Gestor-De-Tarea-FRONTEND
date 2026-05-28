/*import express from 'express'
import mysql from 'mysql2'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_de_prueba'

app.use(express.json())
app.use(cors())

// Configuración de la conexión MySQL 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestortareas'
})

db.connect((err) => {
    if (err) {
        console.error('❌ Error conectando a MySQL:', err.message || err)
    } else {
        console.log('✅ Conectado a MySQL')
    }
})



// Routes
app.get('/', (req, res) => res.send('API Gestor de Tareas'))

// Register
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).json({ message: 'Faltan datos' })

        // Comprueba si el email ya existe
        db.query('SELECT id FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.length > 0) return res.status(409).json({ message: 'El email ya está registrado' })

            const hashed = await bcrypt.hash(password, 10)
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed], (err2) => {
                if (err2) return res.status(500).json({ error: err2.message })
                res.json({ message: 'Usuario registrado correctamente' })
            })
        })
    } catch (error) {
        console.error('Error /register:', error)
        res.status(500).json({ error: 'Error interno' })
    }
})

// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Faltan datos' })

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })

        const user = results[0]
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' })

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' })
        res.json({ token })
    })
})

// Obtener datos del usuario
app.get('/me', autenticarToken, (req, res) => {
    const userId = req.user.id
    db.query('SELECT id, name, email FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })
        res.json(results[0])
    })
})

//Listar tareas del usuario
app.get('/tasks', autenticarToken, (req, res) => {
    const userId = req.user.id
    db.query('SELECT * FROM tasks WHERE user_id = ?', [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        res.json(results)
    })
})

// Crear tarea
app.post('/tasks', autenticarToken, (req, res) => {
    const userId = req.user.id
    const { title, description, completed, created_at, finished_at } = req.body
    console.log('POST /tasks - userId:', userId, 'body:', req.body)
    if (!title || (typeof title === 'string' && title.trim() === '')) {
        return res.status(400).json({ message: 'Falta el título' })
    }

    db.query(
        'INSERT INTO tasks (user_id, title, description, completed, created_at) VALUES (?, ?, ?, false, NOW())',
        [userId, title, description || ''],
        (err) => {
            if (err) {
                console.error('Error al insertar tarea:', err)
                return res.status(500).json({ error: err.message })
            }
            res.json({ message: 'Tarea creada correctamente' })
        }
    )
})

// Editar tarea
app.put('/tasks/:id', autenticarToken, (req, res) => {
    const userId = req.user.id
    const { id } = req.params
    const { title, description, completed } = req.body

    db.query(
        'UPDATE tasks SET title=?, description=?, completed=? WHERE id=? AND user_id=?',
        [title, description, completed, id, userId],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message })
            if (results.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' })
            res.json({ message: 'Tarea actualizada correctamente' })
        }
    )
})

// Eliminar tarea
app.delete('/tasks/:id', autenticarToken, (req, res) => {
    const userId = req.user.id
    const { id } = req.params

    db.query('DELETE FROM tasks WHERE id=? AND user_id=?', [id, userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message })
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' })
        res.json({ message: 'Tarea eliminada correctamente' })
    })
})

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
})

// Manejo simple de errores no capturados
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason)
})
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})
*/
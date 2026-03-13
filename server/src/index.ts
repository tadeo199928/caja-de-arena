import express from 'express'
import dotenv from 'dotenv'
import pool from './db.ts'
import { time } from 'console'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/test', async (req, res) => {
    try{
        const result = await pool.query('Select NOW()')
        console.log('Conexion exitosa a la bdd', result.rows[0])
        res.json({success: true, time: result.rows[0]})
    }
    catch (error){
            console.error('❌ Error de conexión:', error)
            const errorMessage = (error instanceof Error) ? error.message : String(error);
            res.status(500).json ({ success: false, error: errorMessage })
    }
})

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`)
})
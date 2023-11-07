import express from 'express'
import cors from 'cors'
import rootRoutes from './src/routes/rootRoutes.js'

const app = express()

app.use(express.json())
app.use(express.static(".")) 

app.use(cors())

app.use("/api", rootRoutes)
app.listen(8080)


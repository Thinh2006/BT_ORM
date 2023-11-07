import express from "express";
import userRoutes from "./userRoutes.js";
import imageRoutes from "./imageRoutes.js";

const rootRoutes = express.Router()

rootRoutes.use('/user', userRoutes)
rootRoutes.use('/image', imageRoutes)

export default rootRoutes
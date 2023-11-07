import express from "express";
import {
    addImage,
    getCreatedImages,
    getInfo,
    getSavedImages,
    logIn,
    removeImage,
    signUp,
    updateInfo,
} from "../controllers/userControllers.js";
import { khoaApi } from "../config/jwt.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signUp);
userRoutes.post("/logIn", logIn);
userRoutes.get("/getInfo",khoaApi, getInfo);
userRoutes.get("/getSavedImages",khoaApi, getSavedImages);
userRoutes.get("/getCreatedImages",khoaApi, getCreatedImages);
userRoutes.put("/removeImage",khoaApi, removeImage);
userRoutes.post("/createImage",khoaApi, addImage)
userRoutes.put("/updateUser",khoaApi, updateInfo)

export default userRoutes;

import express from "express";
import {
    checkSavedImage,
    getCommentInfo,
    getImageByName,
    getImageInfo,
    getImageList,
    storeComment,
} from "../controllers/imageControllers.js";

const imageRoutes = express.Router();

imageRoutes.get("/getImageList", getImageList);
imageRoutes.get("/getImageByName", getImageByName);
imageRoutes.get("/getImageInfo", getImageInfo);
imageRoutes.get("/getCommentInfo", getCommentInfo);
imageRoutes.get("/checkSavedImage", checkSavedImage);
imageRoutes.post("/storeComment", storeComment);

export default imageRoutes;

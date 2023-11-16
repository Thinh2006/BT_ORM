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
imageRoutes.get("/getImageByName/:tenHinh", getImageByName);
imageRoutes.get("/getImageInfo/:hinhID", getImageInfo);
imageRoutes.get("/getCommentInfo/:hinhID", getCommentInfo);
imageRoutes.get("/checkSavedImage", checkSavedImage);
imageRoutes.post("/storeComment", storeComment);

export default imageRoutes;

import { PrismaClient } from "@prisma/client";
import { decodeToken } from "../config/jwt.js";
const prisma = new PrismaClient();

const getImageList = async (req, res) => {
    const data = await prisma.hinh_anh.findMany();

    res.status(200).send(data);
};

const getImageByName = async (req, res) => {
    const { tenHinh } = req.params;
    const data = await prisma.hinh_anh.findMany({
        where: {
            ten_hinh: {
                contains: tenHinh
            }
        },
    });
    res.status(200).send(data);
};

const getImageInfo = async (req, res) => {
    const { hinhID } = req.params;
    const imageData = await prisma.hinh_anh.findFirst({
        where: {
            hinh_id: + hinhID
        },
    });

    if (imageData) {        
        const { nguoi_dung_id } = imageData;
        const userData = await prisma.nguoi_dung.findFirst({
            where: {
                nguoi_dung_id,
            },
        });
        res.status(200).send({ imageData, userData });
    } else {
        res.status(400).send(`Không tồn tại hình với id ${hinhID}`)
    }
};

const getCommentInfo = async (req, res) => {
    const { hinhID } = req.params;
    const data = await prisma.binh_luan.findFirst({
        where: {
            hinh_id: + hinhID
        },
    });
    res.status(200).send(data);
};

const checkSavedImage = async (req, res) => {
    const { hinh_id } = req.body;
    const {token} = req.headers
    const decode = decodeToken(token)
    const {nguoi_dung_id} = decode.data.data
    const data = await prisma.luu_anh.findFirst({
        where: {
            hinh_id,
            nguoi_dung_id
        },
    });
    if (data) {
        res.status(200).send("Ảnh đã được lưu");
    } else {
        res.send("Ảnh chưa được lưu");
    }
};

const storeComment = async (req, res) => {
    const { hinh_id, noi_dung } = req.body;
    const {token} = req.headers
    const decode = decodeToken(token)
    const {nguoi_dung_id} = decode.data.data
    const data = await prisma.binh_luan.create({
        data: {
            nguoi_dung_id,
            hinh_id,
            noi_dung,
            ngay_binh_luan : new Date()
        },
    });

    res.status(201).send(data);
};

export {
    getImageList,
    getImageByName,
    getImageInfo,
    getCommentInfo,
    checkSavedImage,
    storeComment,
};

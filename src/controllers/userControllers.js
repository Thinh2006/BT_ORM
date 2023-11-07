import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { createToken, decodeToken } from "../config/jwt.js";

const signUp = async (req, res) => {
    let { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    let data = await prisma.nguoi_dung.findFirst({
        where: {
            email,
        },
    });

    mat_khau = bcrypt.hashSync(mat_khau, 10);

    if (data) {
        res.send("Email đã tồn tại");
    } else {
        const newData = await prisma.nguoi_dung.create({
            data: {
                email: email,
                mat_khau: mat_khau,
                ho_ten: ho_ten,
                tuoi: tuoi,
                anh_dai_dien: anh_dai_dien,
            },
        });

        res.status(201).send(newData);
    }
};

const logIn = async (req, res) => {
    let { email, mat_khau } = req.body;
    const checkEmail = await prisma.nguoi_dung.findFirst({
        where: {
            email,
        },
    });

    if (checkEmail) {
        const checkPassword = bcrypt.compareSync(mat_khau, checkEmail.mat_khau);
        if (checkPassword) {
            const token = createToken({ data: checkEmail });
            res.send(token);
        } else {
            res.send("Password không đúng");
        }
    } else {
        res.send("Email không tồn tại");
    }
};

const getInfo = async (req, res) => {
    const { token } = req.headers;
    const decode = decodeToken(token);
    const { nguoi_dung_id } = decode.data.data;

    const data = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id,
        },
    });

    if (data) {
        res.status(200).send(data);
    } else {
        res.status(404).send("Người dùng không tồn tại");
    }
};

const getSavedImages = async (req, res) => {
    const { token } = req.headers;
    const decode = decodeToken(token);
    const { nguoi_dung_id } = decode.data.data;

    const data = await prisma.luu_anh.findMany({
        where: {
            nguoi_dung_id,
        },
    });

    if (!data.length) {
        res.send("Không có ảnh nào được lưu");
    } else {
        res.status(200).send(data);
    }
};

const getCreatedImages = async (req, res) => {
    const { token } = req.headers;
    const decode = decodeToken(token);
    const { nguoi_dung_id } = decode.data.data;

    const data = await prisma.hinh_anh.findMany({
        where: {
            nguoi_dung_id,
        },
    });

    if (!data.length) {
        res.send("Không có ảnh nào được tạo");
    } else {
        res.status(200).send(data);
    }
};

const removeImage = async (req, res) => {
    const { hinh_id } = req.body;
    const { token } = req.headers;
    const decode = decodeToken(token);
    const { nguoi_dung_id } = decode.data.data;

    try {
        const removedData = await prisma.hinh_anh.delete({
            where: {
                hinh_id,
                nguoi_dung_id,
            },
        });

        if (removedData) {
            res.status(200).send("Xóa thành công");
        }
    } catch {
        res.status(400).send("Không thể xóa hình");
    }
};

const addImage = async (req, res) => {
    const { ten_hinh, duong_dan, mo_ta } = req.body;
    const { token } = req.headers;
    const decode = decodeToken(token);
    const { nguoi_dung_id } = decode.data.data;
    const newData = await prisma.hinh_anh.create({
        data: {
            ten_hinh,
            duong_dan,
            mo_ta,
            nguoi_dung_id,
        },
    });
    res.status(201).send(newData);
};

const updateInfo = async (req, res) => {
    const { token } = req.headers;
    const decode = decodeToken(token);
    const { nguoi_dung_id } = decode.data.data;

    const data = await prisma.nguoi_dung.findFirst({
        where: {
            nguoi_dung_id,
        },
    });

    const { email, mat_khau, ho_ten, tuoi, anh_dai_dien } = req.body;
    const hashPassword = bcrypt.hashSync(mat_khau, 10);

    if (data) {
        const newInfo = {
            ...data,
            email,
            mat_khau: hashPassword,
            ho_ten,
            tuoi,
            anh_dai_dien,
        };

        const newData = await prisma.nguoi_dung.update({
            where: {
                nguoi_dung_id,
            },
            data: newInfo,
        });
        res.status(200).send(newData);
    } else {
        res.status(404).send("Người dùng không tồn tại");
    }
};

export {
    signUp,
    logIn,
    getInfo,
    getSavedImages,
    getCreatedImages,
    removeImage,
    addImage,
    updateInfo,
};

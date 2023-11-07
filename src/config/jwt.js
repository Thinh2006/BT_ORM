import jwt from "jsonwebtoken";

const createToken = (data) => {
    const token = jwt.sign({ data }, "CSORM", { expiresIn: "1y" });
    return token;
};

const decodeToken = (token) => {
    return jwt.decode(token);
};

const checkToken = (token) => {
    return jwt.verify(token, "CSORM")
}

const khoaApi = (req, res, next) => {

    const {token} = req.headers

    if (token) {
        const valid = checkToken(token)
        if (valid) {
            next()
        }
        else {
            res.status(401).send('Token không hợp lệ')
        }
    } else {
        res.status(401).send("Không có quyền truy cập")
    }
}

export { createToken, decodeToken, checkToken, khoaApi };

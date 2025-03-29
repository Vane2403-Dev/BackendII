import jwt from "jsonwebtoken";
import envsConfig from "../config/env.config.js";

export const createToken = (data) => {
    return jwt.sign(data, envsConfig.JWT_SECRET, { expiresIn: "5m" });
};

export const verifyToken = (token) => {
    return  jwt.verify(token, envsConfig.JWT_SECRET);
};


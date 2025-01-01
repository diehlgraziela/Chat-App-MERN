import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Acesso não autorizado!" });
    }

    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedUser) {
      return res.status(401).json({ message: "Token de acesso inválido!" });
    }

    const user = await User.findById(decodedUser.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Erro interno!" });
  }
};

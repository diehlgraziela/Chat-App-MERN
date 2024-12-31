import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Todos os campos devem ser preenchidos!" });
    }

    if (password.length < 6) {
      return res.status(422).json({ message: "A senha deve ter pelo menos 6 caracteres!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Usuário já cadastrado!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Dados do usuário inválidos!" });
    }
  } catch (error) {
    console.log("Error creating user:", error.message);
    res.status(500).json({ message: "Erro ao cadastrar usuário!" });
  }
};

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};

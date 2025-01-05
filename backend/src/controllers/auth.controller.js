import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const createUser = async (req, res) => {
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
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Erro interno!" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Uma imagem de perfil deve ser selecionada!" });
    }

    const uploadResponse = cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    res.status(500).json({ message: "Erro interno!" });
  }
};

export const getCurrentUser = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in getUser:", error.message);
    res.status(500).json({ message: "Erro interno!" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Dados do usuário inválidos!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({ message: "Dados do usuário inválidos!" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullname: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error in login:", error.message);
    res.status(500).json({ message: "Erro interno!" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (error) {
    console.error("Error in logout:", error.message);
    res.status(500).json({ message: "Erro interno!" });
  }
};

import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const users = [
  {
    email: "lucas.silva@example.com",
    fullName: "Lucas Silva",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "mariana.souza@example.com",
    fullName: "Mariana Souza",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "joao.oliveira@example.com",
    fullName: "João Oliveira",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "ana.lima@example.com",
    fullName: "Ana Lima",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "carlos.ferreira@example.com",
    fullName: "Carlos Ferreira",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "beatriz.almeida@example.com",
    fullName: "Beatriz Almeida",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "roberto.gomes@example.com",
    fullName: "Roberto Gomes",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "juliana.ribeiro@example.com",
    fullName: "Juliana Ribeiro",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    email: "fernando.martins@example.com",
    fullName: "Fernando Martins",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    email: "patricia.rodrigues@example.com",
    fullName: "Patrícia Rodrigues",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    email: "andre.santos@example.com",
    fullName: "André Santos",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "leticia.melo@example.com",
    fullName: "Letícia Melo",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    email: "marcos.barros@example.com",
    fullName: "Marcos Barros",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "camila.dias@example.com",
    fullName: "Camila Dias",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    email: "ricardo.pereira@example.com",
    fullName: "Ricardo Pereira",
    password: "123456",
    profilePic: "https://randomuser.me/api/portraits/men/15.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.insertMany(users);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.mjs";

const jwtSecret =
  "20741f1747b01f13a45dfcac48dcf33a96d242a8a365b0edc20c92d3a4936c21";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Error signing up" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "1h" });
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }, // ✅ Send user ID
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["id", "name", "email"] });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //   Hash Password
    const hashedPassword = await hash(password, 10);

    console.log(hashedPassword);

    //   Create a new User and save it to DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    console.log("Error in Registering user==>", error);

    res.status(500).json({ message: "Failed to register user!" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if User Exist
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    //Check if the password is correct

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials" });

    //Generate JWT and send to the user
    const age = 1000 * 60 * 60 * 2;

    const token = jwt.sign(
      {
        id: user.id,
        isAdmin:true
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age,
      }
    );

    const {password:userPassword , ...userInfo}=user
    // res.setHeader("Set-Cookie", "test="+"myValue").json("success")

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log("Error in login user==>", error);

    res.status(500).json({ message: "Failed to login user" });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};

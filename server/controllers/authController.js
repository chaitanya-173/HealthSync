import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import { generateToken } from "../utils/generateToken.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check email
    const emailExists = await UserModel.findOne({ email });
    if (emailExists) return errorResponse(res, "Email already registered", 400);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, "Signup successful", {
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // identifier = email OR username

    // Find user by email or username
    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) return errorResponse(res, "Invalid credentials", 400);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return errorResponse(res, "Invalid credentials", 400);

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, "Login successful", {
      token,
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return successResponse(res, "Logged out");
};

export const getCurrentUser = async (req, res) => {
  return successResponse(res, "User fetched", req.user);
};

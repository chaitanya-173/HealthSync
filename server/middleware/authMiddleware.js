import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

// export const protect = async (req, res, next) => {
//   try {
//     console.log(req.headers.authorization);

//     const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

//     console.log("TOKEN =", token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log(decoded);

//     req.user = await User.findById(decoded.userId).select("-password");

//     next();
//   } catch (error) {
//     console.log(error.message);

//     res.status(401).json({
//       message: "Invalid token",
//     });
//   }
// };

export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");

    // when user no longer exists
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

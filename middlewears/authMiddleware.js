import jwt from "jsonwebtoken";
import userModal from "../models/userModal.js";

// Protected Routes middleware
export const requireSignIn = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error); // Change console.log to console.error
    res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModal.findById(req.user._id);
    if (user?.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access", // Corrected typo in the message
      });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

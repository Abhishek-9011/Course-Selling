import jwt from "jsonwebtoken";

const userMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    console.log("Decoded token:", decoded);

    // Assuming the JWT payload contains the user's ID as 'id'
    req.user = { id: decoded.id }; // Ensure this matches the structure of your JWT

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

export default userMiddleware;

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // safer than modifying req.body
    next();
  } catch (error) {
    console.error("JWT verify failed:", error);
    return res.status(401).json({ success: false, message: "Unauthorized: Token expired or invalid token" });
  }
};

export default authUser;

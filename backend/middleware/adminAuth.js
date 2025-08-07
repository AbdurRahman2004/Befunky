import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log(authHeader)

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }


        const token = authHeader.split(" ")[1];


        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not Authorized! Login again" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default adminAuth
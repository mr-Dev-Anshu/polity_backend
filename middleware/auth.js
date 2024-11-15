import jwt from 'jsonwebtoken'
export const verifyToken = async (req, res, next) => {
    try {
        const token =  req.cookies.token;
        if (!token) {
            return res.status(401).json("No token provided")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log( "this is user from the verify Token " ,  req.user)
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}
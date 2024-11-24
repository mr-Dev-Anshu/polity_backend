import User from "../model/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
const createToken = async (user) => {
    try {
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        return token;
    } catch (error) {
        console.log("Error while creating the token ", error)
    }
}
export const signup = async (req, res) => {
    try {
      const { firstName, lastName, email, country, password } = req.body;


      console.log(firstName, lastName, email, country, password );
  
      if (!firstName || !lastName || !email || !country || !password) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create new user
      const newUser = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        country,
      });
  
      // Generate token
      const token = await createToken(newUser);
      console.log(token);
  
      // Set token in cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600 * 1000,
      });
  
      return res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error while signing up", error });
    }
  };
  



export const login = async (req , res ) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
       
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = await createToken(existingUser);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
}


export const logout = async (req , res ) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0)
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json("Error while log out ", error)
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("Error while getting the current user:", error);
        return res.status(500).json({ message: "Error while getting the current user" });
    }
};









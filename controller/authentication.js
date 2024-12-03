import User from "../model/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import { sendEmail } from "../servies/sendMail.js";
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

      sendEmail(
        email,
        'Verify Your Email',
        'Please verify your email using the link below.', 
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #4CAF50;
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
              color: #333333;
            }
            .email-body h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .email-body p {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .email-footer {
              background-color: #f9f9f9;
              text-align: center;
              padding: 10px;
              font-size: 14px;
              color: #666666;
            }
            .verify-button {
              display: inline-block;
              background-color: #4CAF50;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
            }
            .verify-button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Email Verification</h1>
            </div>
            <div class="email-body">
              <h1>Welcome to Our Service!</h1>
              <p>Thank you for signing up. Please verify your email address to activate your account.</p>
              <p>Click the button below to verify your email:</p>
              <a 
                href="https://master.dw8kmiy5kau5k.amplifyapp.com/verify?id=${newUser._id}" 
                class="verify-button">
                Verify Email
              </a>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `
      );
      
  
      // Generate token
      const token = await createToken(newUser);
      console.log(token);
  
      // Set token in cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Requires HTTPS
        sameSite: "none", // Allows cross-origin requests
        maxAge: 3600 * 1000, // 1 hour
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

         if(!existingUser.isVerified){
            sendEmail(
                email,
                'Verify Your Email',
                'Please verify your email using the link below.', 
                `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Email Verification</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f9;
                      margin: 0;
                      padding: 0;
                    }
                    .email-container {
                      max-width: 600px;
                      margin: 20px auto;
                      background: #ffffff;
                      border-radius: 8px;
                      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                      overflow: hidden;
                    }
                    .email-header {
                      background-color: #4CAF50;
                      color: #ffffff;
                      padding: 20px;
                      text-align: center;
                    }
                    .email-body {
                      padding: 20px;
                      color: #333333;
                    }
                    .email-body h1 {
                      font-size: 24px;
                      margin-bottom: 10px;
                    }
                    .email-body p {
                      font-size: 16px;
                      margin-bottom: 20px;
                    }
                    .email-footer {
                      background-color: #f9f9f9;
                      text-align: center;
                      padding: 10px;
                      font-size: 14px;
                      color: #666666;
                    }
                    .verify-button {
                      display: inline-block;
                      background-color: #4CAF50;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 10px 20px;
                      border-radius: 5px;
                      font-size: 16px;
                      font-weight: bold;
                      margin-top: 20px;
                    }
                    .verify-button:hover {
                      background-color: #45a049;
                    }
                  </style>
                </head>
                <body>
                  <div class="email-container">
                    <div class="email-header">
                      <h1>Email Verification</h1>
                    </div>
                    <div class="email-body">
                      <h1>Welcome to Our Service!</h1>
                      <p>Thank you for signing up. Please verify your email address to activate your account.</p>
                      <p>Click the button below to verify your email:</p>
                      <a 
                        href="https://master.dw8kmiy5kau5k.amplifyapp.com/verify?id=${existingUser._id}" 
                        class="verify-button">
                        Verify Email
                      </a>
                    </div>
                    <div class="email-footer">
                      <p>&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                  </div>
                </body>
                </html>
                `
              );       
          return res.status(400).json({message:"Please verify your Email , we have sent the mail"})
         }
       
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
            secure: true, 
            sameSite: "none", 
            maxAge: 3600 * 1000, 
        });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login failed" });
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true, 
            sameSite: "none", 
        });
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error while logging out:", error);
        return res.status(500).json({ message: "Error while logging out" });
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

export const updateProfile = async (req, res) => {
    const id = req.query.id
    try {
        const updatedChannel = await User.findByIdAndUpdate(
            id,
             req.body,
            { new: true }
        );
        if (!updatedChannel) {
            return res.status(404).json({ message: "Channel not found" });
        }
        res.status(200).json(updatedChannel);
    } catch (error) {
        res.status(500).json({ message: error?.message });
    }
};

export const verifyUser = async (req, res) => {
    try {
        const id = req.query.id;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json("User not found");
        }

        if (user.isVerified) {
            return res.status(200).json("User is already verified");
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { isVerified: true },
            { new: true }
        );

        res.status(200).json("User Verified successfully");
    } catch (error) {
        res.status(500).json(error?.message || "Something went wrong while verifying the user");
    }
};







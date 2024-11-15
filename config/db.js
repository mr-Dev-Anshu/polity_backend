import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Indore_hackathon",
          });
     console.log("Database connected successfully :)")
    } catch (error) {
     console.log("Error in Database connection---->" ,error)
    }
}

import mongoose from "mongoose";
import Reels from "../model/Reels.js";

// Create a new reel
export const createReel = async (req, res) => {
  try {
    const { video, title, description, thumbnail, userId } = req.body;
    console.log(userId) ; 
    // Create a new reel
    const reel = new Reels({
      video,
      title,
      description,
      thumbnail,
      userId,
    });

    await reel.save();
    res.status(201).json( reel);
  } catch (error) {
    res.status(500).json({ message: "Error creating reel", error: error.message });
  }
};

// Delete a reel by ID
export const deleteReelById = async (req, res) => {
  try {
    const id  = req.query.id;
    // Find and delete the reel
    const reel = await Reels.findByIdAndDelete(id);

    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }
    res.status(200).json({ message: "Reel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reel", error: error.message });
  }
};

// Update a reel by ID
export const updateReelById = async (req, res) => {
  try {
    const id = req.query.id;
    const updates = req.body;

    // Find and update the reel
    const reel = await Reels.findByIdAndUpdate(id, updates, { new: true });

    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    res.status(200).json({ message: "Reel updated successfully", reel });
  } catch (error) {
    res.status(500).json({ message: "Error updating reel", error: error.message });
  }
};

// Get all reels
export const getAllReels = async (req, res) => {
  try {
     const reels = await Reels.aggregate([
        {$match:{isDown:false}},
        {
          $lookup:{
             from:"users",
             localField:"userId",
             foreignField:"_id",
             as:"user"
        }
      },
      {$unwind:"$user"},
      {$project:{
        'user.password':0,
        'user._id':0
      }}
     ])
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReelsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const reels = await Reels.aggregate([
      {$match:{isDown:false , userId: new mongoose.Types.ObjectId(userId) }}, 
      {
        $lookup:{
           from:"users",
           localField:"userId",
           foreignField:"_id",
           as:"user"
      }
    },
    {$unwind:"$user"},
    {$project:{
      'user.password':0,
    }}
   ])
    if (!reels.length) {
      return res.status(404).json({ message: "No reels found for this user" });
    }
    res.status(200).json(reels);
  } catch (error) {
    res.status(500).json({ message:error.message });
  }
};



import Reels from "../model/Reels.js";

// Create a new reel
export const createReel = async (req, res) => {
  try {
    const { video, title, description, thumbnail, userId } = req.body;

    // Create a new reel
    const reel = new Reels({
      video,
      title,
      description,
      thumbnail,
      userId,
    });

    await reel.save();
    res.status(201).json({ message: "Reel created successfully", reel });
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
    const reels = await Reels.find();

    res.status(200).json({ message: "Reels retrieved successfully", reels });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reels", error: error.message });
  }
};

// Get reels by user ID
export const getReelsByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;

    // Find reels by user ID
    const reels = await Reels.find({ userId });

    if (!reels.length) {
      return res.status(404).json({ message: "No reels found for this user" });
    }

    res.status(200).json({ message: "Reels retrieved successfully", reels });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reels", error: error.message });
  }
};

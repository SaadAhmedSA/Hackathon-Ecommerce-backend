import mongoose from "mongoose";
import Feature from "../models/Feature.js";

const addfeature = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image || typeof image !== "string") {
      return res.status(400).json({ success: false, message: "Invalid image URL" });
    }

    const Addfea = await Feature.create({ image });

    res.status(201).json({
      success: true,
      data: Addfea,
    });
  } catch (error) {
    console.error("Error in addfeature:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getfeature = async (req, res) => {
  try {
    const features = await Feature.find({});
    res.status(200).json({
      success: true,
      data: features,
    });
  } catch (error) {
    console.error("Error in getfeature:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deletefeature = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid feature ID" });
    }

    const deletedFeature = await Feature.findByIdAndDelete(id);
    if (!deletedFeature) {
      return res.status(404).json({ success: false, message: "Feature not found" });
    }

    res.status(200).json({
      success: true,
      message: "Feature deleted successfully",
    });
  } catch (error) {
    console.error("Error in deletefeature:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addfeature, getfeature, deletefeature };

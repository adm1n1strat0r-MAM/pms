import Reel from "../models/reel.model.js";
import Corrugation from "../models/corrugation.model.js";
import createError from "../utils/createError.js";
import Pasting from "../models/pasting.model.js";

const CORRUGATION_STATUS = "Corrugation";

// Controller function to handle the addition of Corrugation
export const addCorrugation = async (req, res, next) => {
  try {
    // Find the paperReel and mediumReel based on their IDs in the request body
    const paperReel = await Reel.findOne({ _id: req.body.paper });
    const mediumReel = await Reel.findOne({ _id: req.body.medium });

    // Check if either paperReel or mediumReel is missing or already in Corrugation status
    if (
      !paperReel ||
      paperReel.status === CORRUGATION_STATUS ||
      !mediumReel ||
      mediumReel.status === CORRUGATION_STATUS
    ) {
      // If invalid paper or medium for Corrugation, send a 404 error response
      return next(createError(404, "Invalid paper or medium for Corrugation"));
    }

    // Determine the size based on the smaller of the two reels
    const size = Math.min(paperReel.size, mediumReel.size);

    // Create Corrugation record with relevant information
    const corrugation = await Corrugation.create({
      paper: req.body.paper,
      medium: req.body.medium,
      size,
      type: paperReel.type,
    });

    // Update both paperReel and mediumReel to Corrugation status in parallel
    await Promise.all([
      Reel.updateOne(
        { _id: req.body.paper },
        { $set: { status: CORRUGATION_STATUS } }
      ),
      Reel.updateOne(
        { _id: req.body.medium },
        { $set: { status: CORRUGATION_STATUS } }
      ),
    ]);

    // Respond with a success status (201 Created) and a success message in JSON format
    res.status(201).json({ message: "Corrugation added successfully" });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Controller function to get Corrugation information
export const getAllCorrugationsInfo = async (req, res, next) => {
  try {
    // Find all Corrugation records and select specific fields for response
    const CorrugationInfo = await Corrugation.find(
      { status: "Processing" },
      "paper medium size type"
    ).populate("paper medium");

    const formattedInfo = CorrugationInfo.map((info) => ({
      Paper: `${info.paper.size} (${info.paper.type})`,
      medium: `${info.medium.size} (${info.medium.type})`,
      Roll: `${info.size} (${info.type})`,
    }));

    console.log(formattedInfo);
    // Respond with a success status (200 OK) and Corrugation information in JSON format
    res.status(200).json(formattedInfo);
    //res.status(200).json(CorrugationInfo);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

export const getCorrugationInfo = async (req, res, next) => {
  try {
    // Find all Corrugation records and select specific fields for response
    const CorrugationInfo = await Corrugation.find(
      { status: "Processing" },
      "paper medium size type"
    ).populate("paper medium");

    const formattedInfo = CorrugationInfo.map((info) => ({
      Paper: `${info.paper.size} (${info.paper.type})`,
      medium: `${info.medium.size} (${info.medium.type})`,
      Roll: `${info.size} (${info.type})`,
    }));

    // Respond with a success status (200 OK) and Corrugation information in JSON format
    res.status(200).json(formattedInfo);
    //res.status(200).json(CorrugationInfo);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

export const addPastingTemp = async (req, res, next) => {
  try {
    const pasting = await Pasting.create(req.body);
    res.status(201).json({ message: "Pasting template is added successfully" });
  } catch (err) {
    next(err);
  }
};

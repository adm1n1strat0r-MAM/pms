import Reel from "../models/reel.model.js";
import Carrugation from "../models/corrugation.model.js";
import createError from "../utils/createError.js";

const CARRUGATION_STATUS = "Carrugation";

// Controller function to handle the addition of Carrugation
export const addCarrugation = async (req, res, next) => {
  try {
    // Find the paperReel and naliReel based on their IDs in the request body
    const paperReel = await Reel.findOne({ _id: req.body.paper });
    const naliReel = await Reel.findOne({ _id: req.body.nali });

    // Check if either paperReel or naliReel is missing or already in Carrugation status
    if (
      !paperReel ||
      paperReel.status === CARRUGATION_STATUS ||
      !naliReel ||
      naliReel.status === CARRUGATION_STATUS
    ) {
      // If invalid paper or nali for Carrugation, send a 404 error response
      return next(createError(404, "Invalid paper or nali for Carrugation"));
    }

    // Determine the size based on the smaller of the two reels
    const size = Math.min(paperReel.size, naliReel.size);

    // Create Carrugation record with relevant information
    const carrugation = await Carrugation.create({
      paper: req.body.paper,
      nali: req.body.nali,
      size,
      type: paperReel.type,
    });

    // Update both paperReel and naliReel to Carrugation status in parallel
    await Promise.all([
      Reel.updateOne(
        { _id: req.body.paper },
        { $set: { status: CARRUGATION_STATUS } }
      ),
      Reel.updateOne(
        { _id: req.body.nali },
        { $set: { status: CARRUGATION_STATUS } }
      ),
    ]);

    // Respond with a success status (201 Created) and a success message in JSON format
    res.status(201).json({ message: "Carrugation added successfully" });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Controller function to get Carrugation information
export const getAllCarrugationsInfo = async (req, res, next) => {
  try {
    // Find all Carrugation records and select specific fields for response
    const carrugationInfo = await Carrugation.find(
      {},
      "paper nali size type"
    ).populate("paper nali");

    const formattedInfo = carrugationInfo.map((info) => ({
      Paper: `${info.paper.size} (${info.paper.type})`,
      Nali: `${info.nali.size} (${info.nali.type})`,
      Roll: `${info.size} (${info.type})`,
    }));

    console.log(formattedInfo);
    // Respond with a success status (200 OK) and Carrugation information in JSON format
    res.status(200).json(formattedInfo);
    //res.status(200).json(carrugationInfo);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

export const getCarrugationInfo = async (req, res, next) => {
  try {
    // Find all Carrugation records and select specific fields for response
    const carrugationInfo = await Carrugation.find(
      {},
      "paper nali size type"
    ).populate("paper nali");

    const formattedInfo = carrugationInfo.map((info) => ({
      Paper: `${info.paper.size} (${info.paper.type})`,
      Nali: `${info.nali.size} (${info.nali.type})`,
      Roll: `${info.size} (${info.type})`,
    }));

    console.log(formattedInfo);
    // Respond with a success status (200 OK) and Carrugation information in JSON format
    res.status(200).json(formattedInfo);
    //res.status(200).json(carrugationInfo);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

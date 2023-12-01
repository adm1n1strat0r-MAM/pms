import Reel from "../models/reel.model.js";
import Carrugation from "../models/corrugation.model.js";
import Roll from "../models/roll.model.js";
import createError from "../utils/createError.js";

const CARRUGATION_STATUS = "Completed";

// Controller function to handle the addition of a new reel
export const addReel = async (req, res, next) => {
  try {
    // Create a new reel using the request body data
    const reel = await Reel.create(req.body);

    // Respond with a success status (201 Created) and the created reel in JSON format
    res.status(201).json({ message: "Reel added successfully" });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Controller function to retrieve reels with status "Stock"
export const getReels = async (req, res, next) => {
  try {
    // Find all reels in the database with status "Stock"
    const reels = await Reel.find({ status: "Stock" });

    // If no reels are found, send a 404 error response
    if (!reels) return next(createError(404, "There is no stock of reels"));

    // Process the reels to create a summary of reel stock
    const reelStock = reels.reduce((acc, reel) => {
      // The callback function takes two parameters: acc (accumulator) and reel (current element)

      // Check if there's already an entry in the accumulator (acc) with the same Reel name
      const existingReel = acc.find(
        (item) => item.Reel === `${reel.size} (${reel.type})`
      );

      // If an entry with the same Reel name exists, add the current reel's weight to its Weights array
      if (existingReel) {
        existingReel.Weights.push(reel.weight);
      } else {
        // If no entry with the same Reel name exists, create a new entry in the accumulator
        acc.push({
          _id: reel._id,
          Reel: `${reel.size} (${reel.type})`,
          Weights: [reel.weight],
        });
      }

      // The result of each iteration is the updated accumulator
      return acc;
    }, []); // The initial value of the accumulator is an empty array

    // Respond with a success status (200 OK) and the summarized reel stock in JSON format
    res.status(200).json(reelStock);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

export const addRolls = async (req, res, next) => {
  try {
    const carrugation = await Carrugation.findOne({ _id: req.params.id });
    // Check if either paperReel or naliReel is missing or already in Carrugation status
    if (!carrugation || carrugation.status === CARRUGATION_STATUS) {
      // If invalid Carrugation, send a 404 error response
      return next(createError(404, "Invalid for Rolls"));
    }
    // Process the carrugation to create a summary of Roll stock
    const carrugationDetail = carrugation.reduce((acc, carrugation) => {
      acc.push({
        carrugationId: carrugation._id,
        rollType: `${carrugation.size} (${carrugation.type})`,
      });

      // The result of each iteration is the updated accumulator
      return acc;
    }, []); // The initial value of the accumulator is an empty array
    const body = {
      carrugationId: carrugationDetail[0].carrugationId,
      rollType: carrugationDetail[0].rollType,
      rollQty: req.body.rollQty,
    };
    // Add a new Rolls using the body data
    const roll = await Roll.create(body);
    // Update both paperReel and naliReel to Carrugation status in parallel
    await Promise.all([
      Carrugation.updateOne(
        { _id: body.carrugationId },
        { $set: { status: CARRUGATION_STATUS } }
      ),
    ]);

    // Respond with a success status (201 Created) and the created Roll in JSON format
    res.status(201).json({ message: "Rolls are added successfully" });
  } catch (err) {
    next(err);
  }
};

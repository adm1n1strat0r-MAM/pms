import Reel from "../models/reel.model.js";
import Carrugation from "../models/corrugation.model.js";
import createError from "../utils/createError.js";

export const addReel = async (req, res, next) => {
  try {
    const reel = await Reel.create(req.body);
    res.status(201).json(reel);
  } catch (error) {
    next(error);
  }
};

export const getReels = async (req, res, next) => {
  try {
    const reels = await Reel.find({ status: "Stock" });
    if (!reels) return next(createError(404, "There no any stock of reels"));
    res.status(200).json(reels);
  } catch (error) {
    next(error);
  }
};

export const addCarrugation = async (req, res, next) => {
  try {
    const paperReel = await Reel.findOne({ _id: req.body.paper });
    if (!paperReel || paperReel.status == "Carrugation")
      return next(createError(404, "There no any reel for the paper"));
    const naliReel = await Reel.findOne({ _id: req.body.nali });
    if (!naliReel || paperReel.status == "Carrugation")
      return next(createError(404, "There no any reel for the nali"));
    const carrugation = await Carrugation.create({
      parper: req.body.paper,
      nali: req.body.nali,
      size: paperReel.size >= naliReel.size ? naliReel.size : paperReel.size,
      type: paperReel.type,
    });
    await Reel.updateOne(
      { _id: req.body.paper },
      { $set: { status: "Carrugation" } }
    );
    await Reel.updateOne(
      { _id: req.body.nali },
      { $set: { status: "Carrugation" } }
    );
    res.status(201).json(carrugation);
  } catch (error) {
    next(error);
  }
};

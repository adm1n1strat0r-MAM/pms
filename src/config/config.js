import { config } from "dotenv";
config();

//exporting the evnironment variables
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_KEY =  process.env.JWT_KEY;
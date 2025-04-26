import mongoose from "mongoose";
import envsConfig from "./env.config.js"; //

export const connectMongoDB = async () => {
  try {
      mongoose.connect(envsConfig.MONGO_ATLAS)
      console.log("Conectando a MongoDB en:", envsConfig.MONGO_ATLAS);

  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

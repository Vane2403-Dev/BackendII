import { userServices } from "../services/user.services.js";

export const userExist = async (req, res, next) => {
  const user = await userServices.getOne( { _id: req.params.id } );
  if(!user) return res.status(404).json({ status: "error", message: "User not found"});

  next();
}
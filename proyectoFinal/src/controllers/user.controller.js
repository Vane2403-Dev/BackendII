import { request, response } from "express";
import { userServices} from "../services/user.services.js";
import { errorLog } from "../utils/errorLog.js";


class UserControllers {
    async getAllUsers (req = request, res= response) {
        try {
          const users = await userServices.getAll();
          res.status(200).json({ status: "ok", users });
        } catch (error) {
          errorLog(error, req);
          res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
      }
async  createUsers (req = request, res= response) {
  try {
    const user = await userServices.create(req.body);
    res.status(201).json({ status: "ok", user });
  } catch (error) {
    errorLog(error, req);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

async getOneUsers (req = request, res= response)  {
  try {
    const user = await userServices.getOne({_id: req.params.id})
    res.status(200).json({ status: "ok", user });
  } catch (error) {
    errorLog(error, req);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

async deleteUsers (req = request, res= response) {
  try {
    await userServices.remove(req.params.id);
    res.status(200).json({ status: "ok", message: `User id ${req.params.id} remove` });
  } catch (error) {
    errorLog(error, req);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
}

async updateUsers (req = request, res= response) {
    try {
      const userUpdate = await userServices.update(req.params.id, req.body);
      res.status(200).json({ status: "ok", userUpdate });
    } catch (error) {
      errorLog(error, req);
      res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  }

}

export const userControllers = new UserControllers()

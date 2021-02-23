import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getRepository(User);

    const checkIfExistis = await userRepository.findOne({
      email,
    });

    if (checkIfExistis) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = userRepository.create({
      name,
      email,
    });

    await userRepository.save(user);

    return res.status(200).json(user);
  }
}

export { UserController };

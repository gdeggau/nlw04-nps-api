import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getCustomRepository(UsersRepository);

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

    return res.status(201).json(user);
  }
}

export { UsersController };

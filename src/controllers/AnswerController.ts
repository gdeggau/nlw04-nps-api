import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppErrors";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  //http://localhost:3333/answers/8?u=17c32eee-29da-4fdf-94e5-b72b528f82c2
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { id } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(id),
    });

    if (!surveyUser) {
      throw new AppError("Survey User not exists", 400);
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export { AnswerController };

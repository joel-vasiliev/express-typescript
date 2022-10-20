import { AppError } from "@shared/errors/AppError";
import { Router, Request, Response, NextFunction } from "express";

import { AuthenticateService } from "@modules/sessions/services/AuthenticateService";

// import { EnsureAuthenticated } from "@shared/middleware/ensureAuthenticated";
// import validate from "@shared/middleware/validate";

// const authorizationUser = new EnsureAuthenticated();

export const sessionsRouter = Router();

sessionsRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { login, password } = await req.body;

      if (login !== "joel" || password !== "12345") {
        throw new AppError("Login ou senha inválidos");
      }

      const userId = "USAFISAJFA01812ASHFJAS";

      const authenticateService = new AuthenticateService();
      const token = await authenticateService.run(userId);

      if (!token) throw new AppError("Ocorreu um erro ao te autenticar.");

      const result = {
        userId,
        token,
      };

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

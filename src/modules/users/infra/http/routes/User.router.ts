import ListUserService from "@modules/users/services/ListUserService";
import { Router, Request, Response, NextFunction } from "express";

import { EnsureAuthenticated } from "@shared/middleware/ensureAuthenticated";
// import validate from "@shared/middleware/validate";

const authorizationUser = new EnsureAuthenticated();

export const userRouter = Router();

userRouter.get(
  "/",
  authorizationUser.run,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //   const { userId } = req.session.user.profile;
      const listUserService = new ListUserService();
      const result = await listUserService.run();
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

// userRouter.post(
//   "/",
// //   validate(UserValidate),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const data = req.body;

//       const createUserService = new CreateUserService();

//       const result = await createUserService.run(data);

//       res.status(200).json(result);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// userRouter.put(
//   "/",
//   authorizationUser.run,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.session.user.profile;
//       const data = req.body;

//       const updateUserService = new UpdateUserService();

//       const result = await updateUserService.run(userId, data);

//       res.status(200).json(result);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

// userRouter.delete(
//   "/",
//   authorizationUser.run,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { userId } = req.session.user.profile;

//       const deleteUserService = new DeleteUserService();

//       const success = await deleteUserService.run(userId);

//       if (success) {
//         res.status(200).json(success);
//       } else {
//         res.status(422).json();
//       }
//     } catch (err) {
//       next(err);
//     }
//   }
// );

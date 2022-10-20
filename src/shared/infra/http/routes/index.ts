import { Router } from "express";

import { userRouter } from "@modules/users/infra/http/routes/User.router";

const routes = Router();

routes.use("/users", userRouter);

routes.get("/", (_, res) => {
  res.status(200).json({
    status: `Aplicação está online 🤯`,
  });
});

export default routes;

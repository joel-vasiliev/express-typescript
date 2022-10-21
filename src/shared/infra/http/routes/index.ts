import { Router } from "express";

import { userRouter } from "@modules/users/infra/http/routes/User.router";
import { sessionsRouter } from "@modules/sessions/infra/http/routes/Sessions.router";
import { productsRouter } from "@modules/products/infra/http/routes/Products.router";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/products", productsRouter);

routes.get("/", (_, res) => {
  res.status(200).json({
    status: `Aplicação está online 🤯`,
  });
});

export default routes;

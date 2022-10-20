import { Router } from "express";

const routes = Router();

routes.get("/", (_, res) => {
  res.status(200).json({
    status: `Aplicação está online 🤯`,
  });
});

export default routes;

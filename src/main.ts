import Routes from "@shared/infra/http/routes/index";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";

import mysql from "mysql2/promise";

// import "@shared/infra/mongoose/connection";
import exceptionCapture from "@shared/middleware/exceptionCapture";
import { connect } from "@shared/database/connection";

dotenv.config();

export let db: mysql.Connection | null = null;

async function main() {
  const database = await connect(db);
  db = database;

  const app: Express = express();
  const port = process.env.PORT || 3000;
  // const swaggerUi = require("swagger-ui-express");
  // const swaggerFile = require("../swagger.json");

  app.use(cors());
  app.use(express.json());

  // app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(Routes);
  app.use(exceptionCapture);

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

main();

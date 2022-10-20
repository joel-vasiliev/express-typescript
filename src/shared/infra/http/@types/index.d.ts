import { SessionInterface } from "@shared/infra/http/interfaces/session.interface";

declare global {
  namespace Express {
    export interface Request {
      session: SessionInterface;
    }
  }
}

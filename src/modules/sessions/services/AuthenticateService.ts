import dotenv from "dotenv";
import { sign } from "jsonwebtoken";

export class AuthenticateService {
  async run(userId: string) {
    const secret = `${process.env.JWT_SECRET}`;

    const token = sign({ sub: userId }, secret, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    return token;
  }
}

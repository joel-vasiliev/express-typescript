import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

export default class ListUserService {
  async run(): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    const rows = await db.query(`SELECT * FROM users;`);

    if (!rows) return [];
    return rows[0];
  }
}

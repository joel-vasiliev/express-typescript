import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

export class VerifyUserService {
  async run(phone: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    const rows: any = await db.query(
      `SELECT * FROM ${process.env.USERS}
        WHERE 
          phone= '${phone}';
      `
    );

    // usuário não existe
    if (!rows) return false;
    // usuário já existe
    if (rows[0][0]) return true;
    return;
  }
}

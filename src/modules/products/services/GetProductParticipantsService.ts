import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

export class GetProductParticipantsService {
  async run(id: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");

    try {
      let participants: any = await db.query(
        `SELECT * FROM ${process.env.PRODUCTS_PARTICIPANTS} where productId='${id}';`
      );
      if (!participants) return [];
      return participants[0];
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

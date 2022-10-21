import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";
import { SuccessMessage } from "@/shared/success/message";

export class DeleteProductParticipantService {
  async run(userId: string, productId: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    try {
      const verifyQuery = `SELECT id FROM ${process.env.PRODUCTS_PARTICIPANTS} WHERE userId='${userId}'`;
      const verify: any = await db.query(verifyQuery);

      if (!verify[0][0])
        throw new AppError("Você não está participando desse rateio");

      const query = `DELETE FROM ${process.env.PRODUCTS_PARTICIPANTS} WHERE userId='${userId}' AND productId='${productId}';`;
      db.query(query);

      const successMessage = SuccessMessage(
        `Participação no rateio ${productId} removida com sucesso!`
      );
      return successMessage;
    } catch (e: any) {
      throw new AppError(`${e.message}`);
    }
  }
}

import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

export class GetProductPriceService {
  async run(id: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");

    try {
      const prices: any = await db.query(
        `SELECT price, minimum FROM ${process.env.PRODUCTS_PRICES} where productId='${id}';`
      );
      if (!prices) return [];

      return prices[0];
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

import { SuccessMessage } from "@/shared/success/message";
import { CalculatePriceService } from "@/shared/services/CalculatePriceService";
import { ICreateProductParticipant } from "@shared/interfaces/Product";

export class CreateParticipantService {
  calculatePriceService: CalculatePriceService;
  constructor() {
    this.calculatePriceService = new CalculatePriceService();
  }
  async run(data: ICreateProductParticipant, productId: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    try {
      const { userId, amount } = data;

      const totalPrice = await this.calculatePriceService.run(amount);

      await db.query(`
        INSERT INTO ${process.env.PRODUCTS_PARTICIPANTS} (
            productId,
            userId,
            amount,
            totalPrice
        ) VALUES (
            '${productId}',
            '${userId}',
            '${amount}',
            '${totalPrice}'
        );
    `);

      // TODO: Quando alguém entrar no rateio atualizar o valor de "products.currentAmount"

      const successMessage = SuccessMessage(
        `Participação para o rateio do produto ${productId} confirmada com sucesso!`
      );

      return successMessage;
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

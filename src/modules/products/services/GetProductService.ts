import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";
import { GetProductPriceService } from "@modules/products/services/GetProductPriceService";
import { GetProductParticipantsService } from "@modules/products/services/GetProductParticipantsService";

export class GetProductService {
  getProductPrice: GetProductPriceService;
  getProductParticipants: GetProductParticipantsService;

  constructor() {
    this.getProductPrice = new GetProductPriceService();
    this.getProductParticipants = new GetProductParticipantsService();
  }
  async run(id: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");

    try {
      const productRows: any = await db.query(
        `SELECT * FROM ${process.env.PRODUCTS} where productId='${id}';`
      );

      const product = productRows[0][0];
      if (!product) return [];

      const {
        productId,
        date,
        header,
        title,
        category,
        status,
        requiredAmount,
        currentAmount,
      } = product;
      const productPrices = await this.getProductPrice.run(productId);
      const arrParticipants = await this.getProductParticipants.run(productId);
      const participants = [];
      for (const i in arrParticipants) {
        if (arrParticipants[i]) {
          const ref = arrParticipants[i];
          const { userId, statusOrder, amount, totalPrice } = ref;
          const userRows: any = await db.query(
            `SELECT * FROM ${process.env.USERS} WHERE userId='${userId}'`
          );
          if (userRows[0][0]) {
            const { name, phone } = userRows[0][0];
            const participantObj = {
              name,
              phone,
              userId,
              statusOrder,
              amount,
              totalPrice,
            };
            participants.push(participantObj);
          }
        }
      }
      const productObj = {
        productId,
        date,
        category,
        header,
        title,
        status,
        goal: {
          requiredAmount,
          currentAmount,
        },
        prices: productPrices,
        participants,
      };

      return productObj;
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

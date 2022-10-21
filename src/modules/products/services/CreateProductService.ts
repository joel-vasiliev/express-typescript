import { db } from "@/main";

import { GetNewIdService } from "@/shared/services/GetNewIdService";
import { SuccessMessage } from "@/shared/success/message";

import { AppError } from "@shared/errors/AppError";
import { IProducts } from "@shared/interfaces/Product";

export class CreateProductService {
  getNewIdService: GetNewIdService;

  constructor() {
    this.getNewIdService = new GetNewIdService();
  }
  async run(data: IProducts): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    try {
      const { header, title, goal, prices, category } = data;
      const { requiredAmount } = goal;
      const currentAmount = 0;
      const status = 0;

      const productId = await this.getNewIdService.run(
        `productId`,
        `${process.env.PRODUCTS}`
      );

      const query = `INSERT INTO ${process.env.PRODUCTS} (
        productId,
        header,
        title,
        category,
        status,
        requiredAmount,
        currentAmount
        ) VALUES (
        '${productId}',
        '${header}',
        '${title}',
        '${category}',
        '${status}',
        '${requiredAmount}',
        '${currentAmount}'
          );
        `;

      await db.query(query);

      for (const i in prices) {
        const ref = prices[i];
        if (ref) {
          const { price, minimum } = ref;
          const query = `
          INSERT INTO ${process.env.PRODUCTS_PRICES} (
            productId,
            price,
            minimum
          ) VALUES (
            ${productId},
            ${price},
            ${minimum}
          )
        ;`;
          await db.query(query);
        }
      }
      const successMessage = SuccessMessage(
        `Produto '${title}' de ID ${productId} criado com sucesso!`
      );
      return successMessage;
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

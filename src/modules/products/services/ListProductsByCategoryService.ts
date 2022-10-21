import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

import { IProducts } from "@shared/interfaces/Product";

import { GetProductPriceService } from "@modules/products/services/GetProductPriceService";

export class ListProductsByCategoryService {
  getProductPrice: GetProductPriceService;

  constructor() {
    this.getProductPrice = new GetProductPriceService();
  }

  async run(category: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");

    try {
      const arrProducts: IProducts[] = [];

      let query = `SELECT * FROM ${process.env.PRODUCTS} WHERE status !=4 AND category='${category}';`;
      const productsRows = await db.query(query);
      if (!productsRows[0]) return [];

      const products: any = productsRows[0];
      for (const i in products) {
        if (products[i]) {
          const {
            productId,
            date,
            header,
            title,
            category,
            status,
            requiredAmount,
            currentAmount,
          } = products[i];

          const productPrices = await this.getProductPrice.run(productId);
          const productObj: IProducts = {
            productId,
            date,
            header,
            title,
            category,
            status,
            goal: {
              requiredAmount,
              currentAmount,
            },
            prices: productPrices,
          };
          arrProducts.push(productObj);
        }
      }
      return arrProducts;
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

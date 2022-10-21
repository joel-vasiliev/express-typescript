import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

export class GetUserProductsService {
  async run(id: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    // diferente de 4 porque 4 significa concluído
    const rows: any = await db.query(
      `SELECT * FROM ${process.env.PRODUCTS_PARTICIPANTS} WHERE userId='${id}' AND statusOrder!=4;`
    );
    if (!rows) return [];

    const data = rows[0];

    const userProductsArr: any = [];
    for (const i in data) {
      const ref = data[i];
      const { id, statusOrder, amount, totalPrice } = ref;

      const productResult = await db.query(
        `SELECT * FROM ${process.env.PRODUCTS} WHERE productId='${ref.productId}'`
      );
      const product = productResult[0];

      const productObj = {
        id,
        statusOrder,
        amount,
        totalPrice,
        product,
      };
      userProductsArr.push(productObj);
    }

    return userProductsArr;
  }
}

import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

import { GetUserProductsService } from "@modules/users/services/GetUserProductsService";

export class GetUserService {
  async run(id: string, data: string = "*"): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    const rows: any = await db.query(
      `SELECT ${data} FROM ${process.env.USERS} WHERE userId=${id};`
    );
    if (!rows[0][0]) return [];
    const { userId, phone, cep, name, administrator } = rows[0][0];
    const getUserProducts = new GetUserProductsService();
    const products = await getUserProducts.run(id);

    const userObj = {
      userId,
      phone,
      cep,
      name,
      administrator,
      products,
    };
    return userObj;
  }
}

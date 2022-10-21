import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";

import { GetNewIdService } from "@shared/services/GetNewIdService";

export class TestService {
  async run(): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    try {
      const getNewIdService = new GetNewIdService();
      const res = await getNewIdService.run(`${process.env.USERS}`);
      return res;
    } catch (e) {
      throw new AppError(`Erro: ${e}`);
    }
  }
}

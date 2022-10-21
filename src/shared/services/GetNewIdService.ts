import { db } from "@/main";
import { AppError } from "../errors/AppError";

export class GetNewIdService {
  async run(idField: string, table: string): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");

    try {
      const res: any = await db.query(`SELECT ${idField} FROM ${table};`);
      if (!res[0]) {
        return 1;
      }
      let data = res[0];
      let idArr = [0];
      for (let i in data) {
        let userId = data[i][idField];
        idArr.push(userId);
      }
      let biggerId: number = 0;

      idArr.sort(function (a: number, b: number): any {
        biggerId = a > b ? a : b;
      });

      const newId = biggerId + 1;
      return newId;
    } catch (e: any) {
      throw new AppError(e.message);
    }
  }
}

import { db } from "@/main";
import { AppError } from "@shared/errors/AppError";
import { ICreateUser } from "@shared/interfaces/User";
import { VerifyUserService } from "@modules/users/services/VerifyUserService";
import { GetNewIdService } from "@/shared/services/GetNewIdService";
import { SuccessMessage } from "@shared/success/message";

export class CreateUserService {
  getNewIdService: GetNewIdService;

  constructor() {
    this.getNewIdService = new GetNewIdService();
  }
  async run(data: ICreateUser): Promise<any> {
    if (!db)
      throw new AppError("Ocorreu um erro ao conectar no banco de dados");
    try {
      const { phone, cep, name } = data;

      const verifyUserService = new VerifyUserService();
      const userExists = await verifyUserService.run(phone);

      if (userExists)
        throw new AppError("Um usuário com este telefone já existe!");

      const userId = await this.getNewIdService.run(
        `userId`,
        `${process.env.USERS}`
      );

      const query = `
      INSERT INTO ${process.env.USERS} (
          userId,
          phone,
          cep,
          name
      ) VALUES (
        '${userId}',
        '${phone}',
        '${cep}',
        '${name}'
      );
  `;

      await db.query(query);
      const successMessage = SuccessMessage(
        `Usuário ${name} criado com sucesso!`
      );
      return successMessage;
    } catch (e: any) {
      throw new AppError(`${e.message}`);
    }
  }
}

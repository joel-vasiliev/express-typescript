import { AppError } from "@/shared/errors/AppError";
import { validate } from "@/shared/middleware/validate";
import {
  CreateParticipantValidate,
  ProductValidate,
} from "@modules/products/validate/product.validate";
import { Router, Request, Response, NextFunction } from "express";
import { ListProductsService } from "@modules/products/services/ListProductsService";
import { ListProductsByCategoryService } from "@modules/products/services/ListProductsByCategoryService";
import { CreateProductService } from "@modules/products/services/CreateProductService";
import { CreateParticipantService } from "@modules/products/services/CreateParticipantService";
import { GetProductService } from "@modules/products/services/GetProductService";
import { DeleteProductParticipantService } from "@modules/products/services/DeleteProductParticipantService";
import { TestService } from "@modules/products/services/TestService";

// import { EnsureAuthenticated } from "@shared/middleware/ensureAuthenticated";
// import validate from "@shared/middleware/validate";

// const authorizationUser = new EnsureAuthenticated();

export const productsRouter = Router();

productsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const listProductsService = new ListProductsService();
      const result = await listProductsService.run();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

// productsRouter.get(
//   "/test",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const testService = new TestService();
//       const results = await testService.run();
//       res.status(200).json(results);
//     } catch (err) {
//       next(err);
//     }
//   }
// );

productsRouter.get(
  "/:productId",
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    try {
      const getProductService = new GetProductService();
      const product = await getProductService.run(productId);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

productsRouter.get(
  "/category/:categoryName",
  async (req: Request, res: Response, next: NextFunction) => {
    const categoryName = req.params.categoryName;
    try {
      const listProductsByCategoryService = new ListProductsByCategoryService();
      const product = await listProductsByCategoryService.run(categoryName);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
);

productsRouter.post(
  "/",
  validate(ProductValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = await req.body;
    try {
      const createProductService = new CreateProductService();
      const result = createProductService.run(body);
      if (!result)
        throw new AppError("Ocorreu um erro ao cadastrar o seu produto");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

productsRouter.post(
  "/:productId/join",
  validate(CreateParticipantValidate),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = await req.body;
    const productId = req.params.productId;
    try {
      const createParticipantService = new CreateParticipantService();
      const result = await createParticipantService.run(body, productId);
      if (!result)
        throw new AppError("Ocorreu um erro ao cadastrar o seu produto");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

productsRouter.delete(
  "/:productId",
  async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const { userId } = await req.body;
    try {
      const deleteProductService = new DeleteProductParticipantService();
      const result = await deleteProductService.run(userId, productId);
      if (!result)
        throw new AppError("Ocorreu um erro ao deletar o seu produto");
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
);

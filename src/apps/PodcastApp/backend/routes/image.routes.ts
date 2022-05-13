import { Router } from "express";
import { GetImageByEntity } from "../controllers/Image/GetimageByEntity.controller";

export const imageRouter = Router();

imageRouter.get("/entity/:uuid", new GetImageByEntity().run);

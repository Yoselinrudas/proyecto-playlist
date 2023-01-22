import { Router } from "express";
import { verifyToken } from "../middleware";
import {
  CrearCancion,
  SoloCancionesPublicas,
  ListadoCanciones,
  BuscarCancion,
} from "./controller";


/*Creamos Instancia */
const musicaRouter: Router = Router();


/*Metodo Get */
musicaRouter.get("/",SoloCancionesPublicas);
musicaRouter.get("/all",verifyToken,ListadoCanciones);
musicaRouter.get("/:id",verifyToken,BuscarCancion);

/*Metodo POST */
musicaRouter.post("/",CrearCancion);


export default musicaRouter;

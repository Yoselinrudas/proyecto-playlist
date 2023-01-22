import { Router } from "express";
import { verifyToken } from "../middleware";
import { CrearUsuario, Logeo, BuscarUsuario } from "./controller";


/*creamos la INSTANCIA */
const usuarioRouter: Router = Router();



/*Metodos POST */
usuarioRouter.post("/", CrearUsuario);
usuarioRouter.post("/login", Logeo);


/*Metodos GET */
usuarioRouter.get("/:id", verifyToken, BuscarUsuario);

export default usuarioRouter;

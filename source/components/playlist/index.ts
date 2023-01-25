import { Router } from "express";
import { verifyToken } from "../middleware";
import {
  InsertarPlaylist,
  AllPlayList,
  AddListaProduc,
  BuscarUsuarioPlay,
} from "./controller";

const playlistRuta: Router = Router();


/*Metodos GET */
playlistRuta.get("/", AllPlayList);
playlistRuta.get("/user/:idUser", BuscarUsuarioPlay);

/*Metodos POST */
playlistRuta.post("/", verifyToken, InsertarPlaylist);

/*Metodo Put Actulizacion*/
playlistRuta.put("/addmusica", verifyToken, AddListaProduc);

export default playlistRuta;

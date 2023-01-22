import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


/*Creamos la Insercion de Datos de playlist */
export const InsertarPlaylist = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    /*Vemos lo que tenemos en Body estoy usando Thunder Client */
    console.log(data)

    const playlist = await prisma.playlist.create({
      include: {songs: true,
      },
      data: {
        name: data.name,user: { connect: { id: data.user_id } }
      }
    });

    res.status(201)
    res.json({ message: "PLAYLIST CREADO CORRECTAMENTE", info: playlist });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



/*Todo el playlist  */
export const AllPlayList = async (_req: Request, res: Response): Promise<void> => {
  try {
    const playlists = await prisma.playlist.findMany({
      select: {
        id: true,name: true,user_id: true,songs: true,
      },
    });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};




/*Añadiendo al playlist */
export const AddListaProduc = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const data = req.body;

    const playlist = await prisma.playlist.update({
      where: {id: data.id_playlist,},
      include: {songs: true,},
      data: {songs: { connect: { id: data.id_song } },
      },
    });

    res.json({
      message: "Añadio a Lista de Reproduccion successfully",
      info: playlist,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



/* Buscando usuario playlist */
export const BuscarUsuarioPlay = async (req: Request,res: Response): Promise<void> => {
  try {
    const idUser = Number(req.params.idUser);
    const playlists = await prisma.playlist.findMany({
      where: {user_id: idUser,},
      select: {id: true,name: true,songs:true,},
    });
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};






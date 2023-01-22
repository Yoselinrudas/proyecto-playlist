import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();



/*creando la cancion */
export const CrearCancion = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, artist, album, year, genre, duration, is_public } = req.body;
    const song = await prisma.song.create({
      data: {name,artist,album,year,genre,duration,is_public,},
    });

    res.status(201).json({ message: "Cancion Creada Correctamente", info: song });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(res)
  }
};


/*listado canciones publicas */

export const SoloCancionesPublicas = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const publicSongs = await prisma.song.findMany({
      where: { is_public: true },
    });
    res.json(publicSongs);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};


/*listado general */
export const ListadoCanciones = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const songs = await prisma.song.findMany();
    res.json(songs);
  } catch (error) {}
};


/*buscando cancion por ID */
export const BuscarCancion = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const result = await prisma.song.findUnique({
      where: {id,},});
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();



/*Creacion de Usuarios */
export const CrearUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, date_born } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,email,password: hashedPassword,date_born: new Date(date_born),},
    });
    res.status(201).json({ message: "Usuario Creado Correctamente", info: user });
  } catch (error) {
    res.status(500).json({ message: error });
    /*Capturo Error */
    console.log(res)
  }
};



/*Creacion de Logeo */
export const Logeo = async (req: Request, res: Response)=> {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Correo no Regisrado" });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ auth: false, message: "Ups ... Contraseña Incorrecta" });
    }

    const token = jwt.sign(user, process.env.TOKEN_SECRET!, {
      /*Le asignamos el Rango de 1 hora al Token */
      expiresIn: 60 * 60 ,
    });

    res.json({ auth: true ,token });
  } catch (error) {
    res.status(500).json({ auth: false, message: error });
    console.log(error)
  }
};


/*Buscando Uusuario por Id */
export const BuscarUsuario = async (req:Request, res:Response): Promise<void>=>{
  try {
    const id: number = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {id,},
      select: {id: true,name: true,email: true,Playlists: true,},
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

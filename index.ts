//const express = require('express');
import express ,{Express, Request,Response} from 'express';

import dotenv from 'dotenv';

// Importando Prisma Client
import { PrismaClient } from '@prisma/client'

dotenv.config();

const prisma = new PrismaClient()

const app:Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req: Request, res:Response) => {
  res.send('Express + TypeScript Server seas');
});



app.listen(port, () => {
  console.log(`Servidor ejecutándose JIJI en http://localhost:${port}`);
});

app.post("/author", async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
    },
  });
  res.status(201).json(user);
});


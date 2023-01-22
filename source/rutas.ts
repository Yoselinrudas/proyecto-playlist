import express, { type Application } from "express";
import { usuarioRouter,musicaRouter,playlistRuta} from "./components/index";
import cors from "cors";

const app: Application = express();

//middlewares
app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/usuario", usuarioRouter);
app.use("/musica", musicaRouter);
app.use("/playlist", playlistRuta);

export default app;

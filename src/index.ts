import express, { Application, Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
config();
const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001;

const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors(corsOptions));



app.get("/test", (req: Request, res: Response) => {
  res
    .status(201)
    .json({ success: true, message: "execution service working " });
});

app.listen(PORT, () => {
  console.log("The execution service will runign the port", PORT);
});
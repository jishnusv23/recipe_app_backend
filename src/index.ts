import express, { Application, Request, Response } from "express";
import { config } from "dotenv";

config();
import userRouter from "./routes/user.router";
import wishlistRouter from './routes/wishlist.router'
import cors from "cors";
import cookieParser from "cookie-parser";

import morgan from "morgan";
import { HttpStatusCode } from "./lib/statusCode/StatusCode";
import errorHandler from "./lib/errorHandler/errorHandler ";


const app: Application = express();
const PORT: number = Number(process.env.PORT) || 3001
console.log(process.env.FRONT_END_URL);
const corsOptions = {
  origin: process.env.FRONT_END_URL,
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
  credentials: true,
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan("dev"));
app.use(cors(corsOptions));

app.use("/api/users", userRouter);
app.use('/api/wishlist',wishlistRouter)

app.get("/test", (req: Request, res: Response) => {
  res
    .status(201)
    .json({ success: true, message: "execution service working " });
});
app.use("*", (req: Request, res: Response) => {
  res.status(HttpStatusCode.NOT_FOUND).json({
    success: false,
    status: 404,
    message: "Api Not found--->auth",
  });
});

app.use(errorHandler);

app.listen(PORT||3001, async() => {
  console.log("The execution service will runign the port", PORT);
});

import path from "path";
import http from "http";

import * as dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

//* Import routes
import indexRouter from "./indexRouter";

//* The server
const app: Express = express();

const corsOptions = {
  origin: true,
  methods: ["POST", "GET", "OPTIONS"],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"], // Specify
};

//* Middlewares
app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
  })
);
// Compress all responses
app.use(compression({ level: 6 }));

//* Route middleware
app.use("", indexRouter);

//* Favicon
app.get("/favicon.ico", (_req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname + "/favicon.svg"));
});
//* Test route
app.get("/test", (req: Request, res: Response): void => {
  console.log("req.ip:", req.ip);
  res.send("<h1 style='color:blue;text-align:center'>API is running</h1>");
});

//* Port
const portHTTP =
  process.env.NODE_ENV === "development" ? (process.env.PORT_Dev as string) : (process.env.PORT_Prod as string);
// console.log("portHTTP:", portHTTP);

const httpServer = http.createServer(app);
//* IPv4
httpServer.listen({ port: portHTTP, host: "127.0.0.1" }, () => {
  console.log(`🚀 Server is listening at http://localhost:${portHTTP}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
  // console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
});

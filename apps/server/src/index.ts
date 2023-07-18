import moduleAlias from "module-alias"
import path from "path";
import dotenv from 'dotenv';

moduleAlias.addAliases({
  "@shared": path.resolve(__dirname + "../../../shared/src"),
})

moduleAlias()
dotenv.config();

console.log(process.env)

import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import { socketio } from './socketio';
import { connectDB } from './config/dbConn';
import mongoose from 'mongoose';

const port = process.env.PORT;

const app: Express = express();
app.use(cors);


const server= http.createServer(app);

const io= new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

export type TypeIO = typeof io

socketio(io)
// 
// connect to database
// connectDB();

// mongoose.connection.once("open", () => {
//   server.listen(port, () => {
//     console.log("🔗 Successfully Connected to MongoDB");
//     console.log(`✅ Application running on port: ${port}`);
//   });
// });
// mongoose.connection.on("error", (err) => {
//   console.log(err);
// });


// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
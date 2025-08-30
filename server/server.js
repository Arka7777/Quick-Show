import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app=express();
const port =3000;

await connectDB()

//middle
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())



//rou
app.get('/',(req,res)=>res.send("Hello Arka"))
app.use('/api/inngest',serve({ client: inngest, functions }))



//server
app.listen(port,()=>console.log(`server running on port ${port}`));
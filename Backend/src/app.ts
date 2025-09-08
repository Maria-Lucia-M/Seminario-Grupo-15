import express from "express";
import { Request, Response } from "express";
const app = express();

app.use('/', (req:Request, res:Response)=> {
    res.send("Holaa!!!?");
});

app.listen(3000, ()=> {
    console.log('Server running on http://localhost:3000/');
});

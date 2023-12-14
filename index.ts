import express,{Express, Request, Response} from "express";
import dataUsers from './data.json';
import userRoutes from './routes/users';
import cors from "cors";
const port: Number = 8000;
const app: Express= express();
app.use(cors())
app.use(express.json());
app.use('/api/user',userRoutes);
app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
})
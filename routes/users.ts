import express, { Router } from 'express';
const router: Router = express.Router();
import getUser  from "../controllers/user";


router.post("/", getUser );

export default router;
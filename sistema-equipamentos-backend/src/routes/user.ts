import express from "express";
import { authenthicate, createUser } from "../controllers/user";

const router = express.Router()
router.post('/user/login', authenthicate);

router.post('/user/create', createUser)

export default router;

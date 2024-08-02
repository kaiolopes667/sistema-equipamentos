import express from "express";
import { authenthicate, createUser } from "../controllers/user";
import asyncHandler from '../asyncHandler';

const router = express.Router()
router.post('/user/login', asyncHandler(authenthicate));

router.post('/user/create', asyncHandler(createUser))

export default router;
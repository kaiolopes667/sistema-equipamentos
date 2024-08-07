import equipmentRoutes from "./routes/equipment";
import userRoutes from "./routes/user";
import cors from "cors";
import 'express-async-errors';
import express, { NextFunction, Request, Response } from "express";
import path from 'path';

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", equipmentRoutes)
app.use("/", userRoutes)

// app.use(
//     '/files',
//     express.static(path.resolve(__dirname, '..', 'tmp'))
// );

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(process.env.PORT || 8800, () => console.log("Servidor on"))

import express from "express";
import equipmentRoutes from "./routes/equipment";
import userRoutes from "./routes/user";
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", equipmentRoutes)
app.use("/", userRoutes)

app.listen(process.env.PORT || 8800, () => console.log("Servidor on"))

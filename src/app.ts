import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorHandler } from "./errors"
import usersRouter from "./routes/users.routes"
import categoryRouter from "./routes/categories.routes"


const app = express()
app.use(express.json())
app.use(usersRouter);
app.use(categoryRouter)
app.use(errorHandler)

export default app
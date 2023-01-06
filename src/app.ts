import "reflect-metadata"
import "express-async-errors"
import express from "express"
import { errorHandler } from "./errors"
import usersRouter from "./routes/users.routes"
import categoryRouter from "./routes/categories.routes"
import { propertyRouter } from "./routes/property.routes"
import { scheduleRouter } from "./routes/schedules.toutes"


const app = express()
app.use(express.json())
app.use(usersRouter);
app.use(categoryRouter)
app.use(propertyRouter)
app.use(scheduleRouter)
app.use(errorHandler)

export default app
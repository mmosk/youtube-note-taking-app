import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
  })
);

app.listen(PORT, () =>
  console.log(`The server is up and running on PORT ${PORT}`)
);

import  express  from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";


/*ROUTE IMPORT*/


/*CONFIGURATIONS*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


/*ROUTE MIDDLEWARES*/
// app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("This is home page of the server");
});


/*SERVER*/

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import config from "config";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import cors from "cors";

const port = config.get("port") as number;

const app = express();

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  log.info(`Server is listening at PORT:${port}`);

  connect();
  routes(app);
});

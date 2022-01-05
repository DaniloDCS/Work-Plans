import express from "express";
import cors from "cors";
import layouts from "express-ejs-layouts";

import router from "./routes";
import Account from "./models/Account";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middleware();
    this.routes();
    this.database();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.set("view engine", "ejs");
    this.express.use(layouts);
    this.express.use("/public/", express.static("public/"));
    this.express.use("/fontawesome/", express.static("node_modules/@fortawesome/fontawesome-free/"));
  }

  private routes(): void {
    this.express.use(router);
  }

  private database(): void {
    this.express.use("/account", Account);
  }
}

export default new App().express;

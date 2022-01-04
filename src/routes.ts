import { Router, Request, Response } from "express";
import auth from "./auth";
import App from "./App";

const routes = Router();

routes.get("/description", async (req: Request, res: Response) => {
  res.render("description", {
    layout: false,
  });
});

routes.get("/", async (req: Request, res: Response) => {
  res.render("pages/signin");
});

routes.get("/signup", async (req: Request, res: Response) => {
  res.render("pages/signup");
});

routes.get("/forgot", async (req: Request, res: Response) => {
  res.render("pages/forgot");
});

routes.get("/dashboard", auth.auth, async (req: Request, res: Response) => {
  const user = App.get("user");

  res.render("pages/dashboard", {
    user,
  });
});

export default routes;

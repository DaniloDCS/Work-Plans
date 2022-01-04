import { Router, Request, Response } from "express";
import auth from "./auth";

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
  res.render("pages/dashboard");
});

export default routes;

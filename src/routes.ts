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
  res.render("pages/signin", {
    title: "Sign In",
    msg: "",
  });
});

routes.get("/signup", async (req: Request, res: Response) => {
  res.render("pages/signup", {
    title: "Sign Up",
  });
});

routes.get("/forgot", async (req: Request, res: Response) => {
  res.render("pages/forgot", {
    title: "Forgot",
  });
});

routes.get("/dashboard", auth.auth, async (req: Request, res: Response) => {
  const user = App.get("user");

  res.render("pages/dashboard", {
    user,
    title: "Dashboard",
  });
});

export default routes;

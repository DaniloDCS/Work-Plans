import { Router, Request, Response } from "express";
import database from "../connection";
import App from "../App";

const account = Router();

account.post("/authenticate", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { user, session, error } = await database.auth.signIn({
    email: username,
    password,
  });

  if (error) res.redirect("/");

  const me = {
    email: user.email,
    username: user.user_metadata.name,
    name: user.user_metadata.name,
    phone: user.user_metadata.phone,
  };

  App.set("user", { user: me, session });
  
  return res.redirect("/dashboard");
});

account.post("/register", async (req: Request, res: Response) => {
  const { name, username, email, phone, password } = req.body;

  const { user, session, error } = await database.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        username,
        name,
        phone,
      },
    }
  );

  if (error) res.redirect("/signup");

  return res.redirect("/");
});

account.get("/signout", async (req: Request, res: Response) => {
  const { error } = await database.auth.signOut();
  return res.redirect("/");
});

account.post("/recovery", async (req: Request, res: Response) => {
  return res.send("In construction...");
});

export default account;

import { Router, Request, Response } from "express";
import database from "../connection";

const account = Router();

account.post("/authenticate", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const { user, session, error } = await database.auth.signIn({
    email: username,
    password,
  });

  if (error) res.redirect("/");

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

export default account;

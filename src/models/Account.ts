import { Router, Request, Response } from "express";
import database from "../connection";
import App from "../App";

const account = Router();

account.post("/authenticate", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  let email = "";

  if (username.charAt(0) === "@") {
    const { body, error } = await database
      .from("Accounts")
      .select("email")
      .match({ username });

    email = body[0].email;
  } else {
    email = username;
  }

  if (email) {
    const { user, session, error } = await database.auth.signIn({
      email,
      password,
    });

    if (error) {
      res.redirect("/");
    } else {
      const me = await database
        .from("Accounts")
        .select("*")
        .match({ user_id: user.id })
        .limit(1)
        .single();

      App.set("user", { user: me.data, session });

      return res.redirect("/dashboard");
    }
  } else {
    res.redirect("/");
  }
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
        username: username.toLowerCase().replace(/ /g, ""),
        name,
        phone,
      },
    }
  );

  const my_id = user.id;

  if (error) {
    return res.redirect("/signup");
  } else {
    const { body } = await database.from("Accounts").insert({
      user_id: my_id,
      name,
      email,
      phone,
      username: username.toLowerCase().replace(/ /g, ""),
    });

    const { user, session, error } = await database.auth.signIn({
      email,
      password,
    });

    return res.redirect("/dashboard");
  }
});

account.get("/signout", async (req: Request, res: Response) => {
  const { error } = await database.auth.signOut();
  return res.redirect("/");
});

account.post("/recovery", async (req: Request, res: Response) => {
  return res.send("In construction...");
});

account.get("/check/:opt/:value", async (req: Request, res: Response) => {
  const option = req.params.opt,
    value = req.params.value;

  const { count, error } = await database
    .from("Accounts")
    .select("*", { count: "exact" })
    .like(`${option}`, `%${value}%`)
    .limit(10);

  res.json({ count, error });
});

export default account;

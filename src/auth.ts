import connection from "./connection";

export default {
  auth: async function (req, res, next) {
    const session = await connection.auth.session();

    if (session) return next();

    return res.redirect("/");
  },
};

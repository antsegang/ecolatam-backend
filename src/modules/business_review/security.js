import auth from "../../auth/index.js";

export default function checkAuth() {
  function middleware(req, res, next) {
    const id = req.body.id_user;
    auth.checkAuth.confirmToken(req, id);
    next();
  }

  return middleware;
}

import auth from "../../auth/index.js";

function checkAuth() {
  function middleware(req, res, next) {
    const id = req.body.id;
    auth.checkAuth.confirmToken(req, id);
    next();
  }

  return middleware;
}

function checkAdmin() {
  function middleware(req, res, next) {
    const id = req.body.id;
    auth.checkAdmin.confirmToken(req, id);
    next();
  }

  return middleware;
}
export default {
  checkAuth,
  checkAdmin,
};

import auth from "../../auth/index.js";

function checkAuth() {
  function middleware(req, res, next) {
    const id = req.body.id_user;
    auth.checkAuth.confirmToken(req, id);
    next();
  }

  return middleware;
}

function checkAdmin() {
  function middleware(req, res, next) {
    const id = req.body.approved_by;
    auth.checkAdmin.confirmToken(req, id);
    next();
  }

  return middleware;
}
export default {
  checkAuth,
  checkAdmin,
};

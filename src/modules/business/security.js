import auth from "../../auth/index.js";

function checkKYCUser() {
  async function middleware(req, res, next) {
    const id = req.body.id_user;

    try {
      await auth.checkKYCUser.confirmToken(req, id);
      next();
    } catch (err) {
      next(err);
    }
  }
  return middleware;
}

function checkOwner() {
  async function middleware(req, res, next) {
    const id = req.body.id;

    try {
      await auth.checkOwner.confirmToken(req, id);
      next();
    } catch (err) {
      next(err);
    }
  }
  return middleware;
}

export default {
  checkKYCUser,
  checkOwner,
};

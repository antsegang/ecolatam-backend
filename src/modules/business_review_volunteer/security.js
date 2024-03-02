import auth from "../../auth/index.js";

function checkOwner() {
  async function middleware(req, res, next) {
    const id = req.body.id_business;

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
  checkOwner,
};

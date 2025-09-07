import auth from "../../auth/index.js";

export default function checkAdmin() {
  async function middleware(req, res, next) {
    const id = req.body.added_by;
    try {
      await auth.checkAdmin.confirmToken(req, id);
      next();
    } catch (err) {
      next(err);
    }
  }

  return middleware;
}

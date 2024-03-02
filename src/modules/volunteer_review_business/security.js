import auth from "../../auth/index.js";

function checkVolunteer() {
  async function middleware(req, res, next) {
    const id = req.body.id_volunteer;

    try {
      await auth.checkVolunteer.confirmToken(req, id);
      next();
    } catch (err) {
      next(err);
    }
  }
  return middleware;
}
export default {
  checkVolunteer,
};

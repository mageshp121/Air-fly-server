import authController from "../controllers/authController.js";
import flightController from "../controllers/flightController.js";
import { validateEmail, validateOTP } from "../middlewares/validate.js";

const authRouter = (router) => {
  router.route('/flight-search').post(flightController.search);
  router.route('/flight-all').get(flightController.getAllFlight)
  router.route('/flight-deatails').post(validateOTP, authController.emailVerifyAndLogin);
  router.route('/flight-book').post(authController.logOut);
  router.route("/flight-seat").get(flightController.getFlightSeat);
  router.route("/flight-paymen-verify").post(flightController.verifyPayment)
  router.route("/fllight-ticket-checkout").post(flightController.ticketCheckOut)
  return router;
}

export default authRouter;

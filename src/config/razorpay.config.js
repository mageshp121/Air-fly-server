import Razorpay from "razorpay";
import config from './env.config.js';


export const instance = new Razorpay({
  key_id:config.razor_pay_key,
  key_secret: config.razor_pay_secret,
});

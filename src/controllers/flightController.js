import expressAsyncHandler from "express-async-handler";
import flightRepository from '../repositories/flightRespositories.js';
import seatRespository from '../repositories/seatRespository.js';
import { instance } from "../config/razorpay.config.js";
import crypto from "crypto"
import config from "../config/env.config.js";

const flightController = {
    search: expressAsyncHandler(async (req, res, next) => {
      console.log(req.body,"req,bodyu");
        const fightData = await flightRepository.findFlight(req.body);
        console.log(fightData,"flightdata");
        return res.status(200).json(fightData);
    }),
    getAllFlight:expressAsyncHandler(async(req,res,next)=>{
        const allFlightData= await flightRepository.getFlight();
        return res.status(200).json(allFlightData)
    }),
    getFlightSeat:expressAsyncHandler(async(req,res,next)=>{
        console.log(req.query.seatId,"body obejct contain flight Id");
         const flightTicketData = await seatRespository.findSeatByFlightId(req.query.seatId);
         console.log(flightTicketData,"flight ticket dat");
         return res.status(200).json(flightTicketData)
    }),
    ticketCheckOut:expressAsyncHandler(async(req,res)=>{
             console.log(req.body);
             const options = {
                amount: req.body.totalAmmount,
                currency: "INR",
              };
             await instance.orders.create(options).then(async(order)=>{
                console.log(order,"order");
               const ticketOrderDetails = {...req.body,order_Id:order.id};
               const flightTicketResponse = await flightRepository.crateBooking(ticketOrderDetails);
               return res.status(200).json(flightTicketResponse)
             })
    }),
    verifyPayment:expressAsyncHandler(async(req,res)=>{
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body ;
        console.log(req.body,"bodydyydyd");
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", config.razor_pay_secret)
			.update(sign.toString())
			.digest("hex");
		if (razorpay_signature === expectedSign) {
           const  data = {
              orderId:razorpay_order_id,
              status:"success"
           }
         const ticketConfirmation = await flightRepository.bookingConfirmation(data)
		 res.status(200).json("sucess")
        }
    })
};

export default flightController;

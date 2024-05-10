// ,departure_time:new Date("2024-05-09"),arrival_time:new Date("2024-05-12")
import FLIGHTS from "../models/flights.js";
import creatOrderTicket from "../models/ticketOrder.js";
import flightSeat from "../models/flightSeat.js"
const flyRepositories = {
    findFlight: async (data) => {
        console.log(data,"data aas");
        return await FLIGHTS.find({departure_city:data.from,arrival_city:data.to,departure_time:new Date(data.depart),arrival_time:new Date(data.returnDate)});
    },
    createFly:async()=>{
      const  data = {
        "flight_id": "FL004",
        "airline": "Example Airlines",
        "departure_airport": "SIN",
        "departure_city": "Singapore",
        "departure_country": "Singapore",
        "departure_terminal": "Terminal 4",
        "departure_gate": "Gate 15",
        "departure_time": new Date("2024-05-11"),
        "departure_status": "On-time",
        "arrival_airport": "HND",
        "arrival_city": "Tokyo",
        "arrival_country": "Japan",
        "arrival_terminal": "Terminal 2",
        "arrival_gate": "Gate 7",
        "arrival_time": new Date("2024-05-16"),
        "arrival_status": "Scheduled",
        "price": 700,
        "currency": "USD",
        "seats_available": 120,
        "class": "Economy",
        "duration": "08:00",
        "layovers": [
          {
            "airport": "KUL",
            "city": "Kuala Lumpur",
            "country": "Malaysia",
            "departure_time": "2024-05-10 14:00:00",
            "departure_status": "On-time",
            "arrival_time": "2024-05-10 15:30:00",
            "arrival_status": "Scheduled",
            "duration": "01:30"
          },
          {
            "airport": "HKG",
            "city": "Hong Kong",
            "country": "China",
            "departure_time": "2024-05-10 16:00:00",
            "departure_status": "On-time",
            "arrival_time": "2024-05-10 17:30:00",
            "arrival_status": "Scheduled",
            "duration": "01:30"
          }
        ],
        "amenities": [
          "In-flight entertainment",
          "Wi-Fi",
          "Meals included"
        ]
          };
         const flight = new FLIGHTS(data);
         return await flight.save();
    },
    getFlight:async()=>{
        return await FLIGHTS.find();
    },
    crateBooking:async(ticketEntity)=>{
        const ticketOrder = new creatOrderTicket(ticketEntity);
        return await ticketOrder.save();
    },
    bookingConfirmation:async(queryPayload)=>{
        console.log(queryPayload,"queryddd");
      const order = await creatOrderTicket.findOne({order_Id:queryPayload.orderId});
      console.log(order,"order-");
      const updatedResponse = await creatOrderTicket.updateOne({order_Id:queryPayload.orderId},{status:"success"});
      console.log(parseInt(order.seatnumber),"addsds");
      const updateSeat = await flightSeat.findOneAndUpdate(
        { 
            flightId: order.flightId, 
        },
        { 
            $set: { 'seatsData.$[elem].status': 'booked' } 
        },
        { 
            arrayFilters: [{ 'elem.id': parseInt(order.seatnumber)}],
            new: true // to return the updated document
        }
    );
    //   console.log(updateSeat,"updated seata");
      console.log(updatedResponse,"updated response");
    }

};

export default flyRepositories;
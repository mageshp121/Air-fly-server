import mongoose from "mongoose"

// Define the schema
const flightSchema = new mongoose.Schema({
    firstName:{
      type:String
    },
    lasName:{
      type:String
    },
    numberOfpassenger:{
      type:String
    },
    flightId: {
        type: String,
        required: true
    },
    userId: {
        type: String
    },
    status: {
        type: String,
        enum: ["booked", "cancelled", "pending", "completed"]
    },
    seatnumber: {
        type: String
    },
    order_Id:{
        type:String
    },
    totalAmmount:{
        type:Number
    }
});

// Create a model from the schema
const creatOrderTicket = mongoose.model('Flight', flightSchema);
export default creatOrderTicket
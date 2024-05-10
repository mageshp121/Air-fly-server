import mongoose from "mongoose";


// Define the Flight schema
const flightSchema = new  mongoose.Schema({
  flightId: { type: String, required: true },
  seatsData: [{
    id: { type: Number, required: true },
    status: { type: String, enum: ['available', 'booked'], required: true }
  }]
});

// Compile the model from the schema
const flightSeat = mongoose.model('flightSeat', flightSchema);
export default flightSeat;

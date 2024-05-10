import mongoose  from "mongoose";

// Define Flight schema
const flightSchema = new mongoose.Schema({
  flight_id: String,
  airline: String,
  departure_airport: String,
  departure_city: String,
  departure_country: String,
  departure_terminal: String,
  departure_gate: String,
  departure_time: Date,
  departure_status: String,
  arrival_airport: String,
  arrival_city: String,
  arrival_country: String,
  arrival_terminal: String,
  arrival_gate: String,
  arrival_time: Date,
  arrival_status: String,
  price: Number,
  currency: String,
  seats_available: Number,
  class: String,
  duration: String,
  layovers: [{
    airport: String,
    city: String,
    country: String,
    departure_time: Date,
    departure_status: String,
    arrival_time: Date,
    arrival_status: String,
    duration: String
  }],
  amenities: [String]
});

// Create model for the database object
const FLIGHTS = mongoose.model('fights', flightSchema);

export default FLIGHTS





import flightSeat from "../models/flightSeat.js"



const authRepositories = {
    findSeatByFlightId: async (flightId) => {
        console.log(flightId,"flight id at repository");
        return await flightSeat.findOne({flightId:flightId});;
    },
    

    
};

export default authRepositories;
var currentFlight;
var airports = [];
var airlines = [];
var weather = [];

class Airport {
    constructor(name, delayRate) {
        this.name = name;
        this.delayRate = delayRate;
    }
}

class Airline {
    constructor(name, delayRate) {
        this.name = name;
        this.delayRate = delayRate;
    }
}

class Weather {
    constructor(type, delayRate) {
        this.type = type;
        this.delayRate = delayRate;
    }
}

class Flight {
    constructor(flightNumber, airlineName, departureAirport, arrivalAirport, flightDay, currentStatus) {
        this.flightNumber = flightNumber;
        this.airlineName = airlineName;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightDay = flightDay;
        this.currentStatus = currentStatus;
    }
}

function updateLists() {
    airports.push(new Airport("Sofia", 0.5));
    airports.push(new Airport("Varna", 0.6));
    airports.push(new Airport("Burgas", 0.3));
    
    airlines.push(new Airline("WizzAir", 0.9));
    airlines.push(new Airline("RyanAir", 0.7));
    airlines.push(new Airline("Lufthansa", 0.1));
    
    weather.push(new Weather("Rain", 0.2));
    weather.push(new Weather("Snow", 0.4));
    weather.push(new Weather("Clear", 0.1));
}

function calculate() {
    let airlineDelay = 0.0;
    let airportDelay = 0.0;
    let weatherDelay = 0.0;

    airlines.forEach(item => {
        if (item.name === currentFlight.airlineName) airlineDelay = item.delayRate;
    });

    airports.forEach(item => {
        if (item.name === currentFlight.departureAirport) airportDelay = item.delayRate;
    });

    weather.forEach(item => {
        if (item.type === "Rain") weatherDelay = 0.2;  
    });

    let percentage = (0.4 * airlineDelay) + (0.4 * airportDelay) + (0.2 * weatherDelay);
    return (percentage * 100).toFixed(2) + "% chance of delay";
}

async function getFlightByNumber(flightNumber) {
    updateLists();

    const API_KEY = "b82abca13196a291e88595833fdb3dbd"; // Replace with your actual key
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data.length === 0) {
            document.getElementById("flightInfo").innerText = "No flight found.";
            return;
        }

        var flight = data.data[0];

        currentFlight = new Flight(
            flight.flight.iata, 
            flight.airline.name, 
            flight.departure.airport, 
            flight.arrival.airport, 
            flight.flight_date, 
            flight.flight_status
        );

        document.getElementById("flightInfo").innerHTML = `
            <p><strong>Flight:</strong> ${flight.flight.iata} (${flight.airline.name})</p>
            <p><strong>From:</strong> ${flight.departure.airport} (${flight.departure.iata})</p>
            <p><strong>To:</strong> ${flight.arrival.airport} (${flight.arrival.iata})</p>
            <p><strong>Current:</strong> ${flight.flight_status}</p>
            <p><strong>Flight Date:</strong> ${flight.flight_date || "N/A"}</p>
            <p><strong>Scheduled Departure:</strong> ${flight.departure.scheduled || "N/A"}</p>
            <p><strong>Arrival Delay:</strong> ${flight.arrival.delay || "No delay reported"}</p>
            <p><strong>Risk of delay:</strong> ${calculate()}</p>
        `;
    } catch (error) {
        console.error("Error fetching flight data:", error);
    }
}

function searchFlight() {
    const flightNumber = document.getElementById("flightNumber").value.trim();
    if (!flightNumber) {
        alert("Please enter a flight number.");
        return;
    }
    getFlightByNumber(flightNumber);
}

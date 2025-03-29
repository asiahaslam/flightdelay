class AirportClass {
    constructor(name, delayRate) {
        this.name = name;
        this.delayRate = delayRate;
    }
}

var airports = [];
airports.push(new AirportClass("Sofia", .5));
airports.push(new AirportClass("Varna", .6));
airports.push(new AirportClass("Burgas", .3));

class Airline {
    constructor(name, delayRate) {
        this.name = name;
        this.delayRate = delayRate;
    }
}

var airlines = [];
airlines.push(new Airline("WizzAir", .9));
airlines.push(new Airline("RyanAir", .7));
airlines.push(new Airline("Lufthansa", .1));

class Weather {
    constructor(type, delayRate) {
        this.type = type;
        this.delayRate = delayRate;
    }
}

var weather = [];
weather.push(new Weather("Rain", .2));
weather.push(new Weather("Snow", .4));
weather.push(new Weather("Clear", .1));
class Flight {
    constructor(flightNumber, airlineName, departureAirport, arrivalAirport, flightDay, currentStatus) {
        this.flightNumber = flightNumber;
        this.airlineName = airlineName;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightDay = flightDay;
    }
}

/* function sendToBackend() {
    const inputText = document.getElementById("userInput").value;

    // Ensure the input is not empty
    if (!inputText.trim()) {
        alert("Please enter a string");
        return;
    }

    fetch("http://localhost:5038/api/hello/airline", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: inputText })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("output").innerText = data.findAirline;
    })
    .catch(error => console.error("Error:", error));
} */

function calculate(flight) {
    var percentage = 0.0;
    var airlineDelay = 0.0;
    var airportDelay = 0.0;
    var weatherDelay = 0.0;
    airlines.forEach(airline);
        function airline(item) {
            if (item == currentFlight.airlineName) airlineDelay = airline.delayRate;
        } 
    airports.forEach(airportCalc);
    
    function airportCalc(item) {
        if (item == currentFlight.airport) airportDelay = airport.delayRate;
    }
    percentage = .5 * airlineDelay + .5 * airportDelay;
    return percentage;
}

async function getFlightByNumber(flightNumber) {
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

        var currentFlight = new Flight(flight.flight.number, flight.airline.name, flight.departure.airport, flight.arrival.airport, flight.flight.date, flight.flight_status);

        document.getElementById("flightInfo").innerHTML = `
            <p><strong>Flight:</strong> ${flight.flight.number} (${flight.airline.name})</p>
            <p><strong>From:</strong> ${flight.departure.airport} (${flight.departure.iata})</p>
            <p><strong>To:</strong> ${flight.arrival.airport} (${flight.arrival.iata})</p>
            <p><strong>Status:</strong> ${flight.flight_status}</p>
            <p><strong>Flight:</strong> ${flight.flight.date} (${flight.airline.date})</p>
            <p><strong>From:</strong> ${flight.departure.scheduled} (${flight.departure.scheduled})</p>
            <p><strong>To:</strong> ${flight.arrival.delay} (${flight.arrival.delay})</p>
            <p><strong>Status:</strong> ${flight.flight_status}</p>
            <p><strong>Risk of delay:</strong> ${calculate(currentFlight)}</p>
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


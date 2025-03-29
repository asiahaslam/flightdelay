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
        this.temperature = 0;
        this.weatherCode = 0;
    }
}

function updateLists() {
    airports.push(new Airport("Sofia", 0.96));
    airports.push(new Airport("Athens", 0.60));
    airports.push(new Airport("Bucharest", 0.5771));

    airlines.push(new Airline("AEGAN AIRLINES", 0.67));
    airlines.push(new Airline("AIR BALTIC", 0.72));
    airlines.push(new Airline("AIR SERBIA", 0.59));
    airlines.push(new Airline("AKRIA ISRAELI INLAND AIRLINES", 0.66));
    airlines.push(new Airline("AUSTRIAN AIRLINES", 0.75));
    airlines.push(new Airline("AVANTI AIR", 0.84));
    airlines.push(new Airline("BH AIR", 0.84));
    airlines.push(new Airline("BRITISH AIRWAYS", 0.77));
    airlines.push(new Airline("BUL AIR", 0.73));
    airlines.push(new Airline("BULGARIA AIR", 0.70));
    airlines.push(new Airline("CORENDON AIRLINES", 0.70));
    airlines.push(new Airline("DEUTSCHE LUFTHANSA", 0.69));
    airlines.push(new Airline("EASY JET EUROPE GMBH", 0.68));
    airlines.push(new Airline("EASYJET AIRLINE", 0.65));
    airlines.push(new Airline("EL AL - ISRAEL AIRLINES", 0.77));
    airlines.push(new Airline("ENTER AIR", 0.68));
    airlines.push(new Airline("EUROPEAN AIR CHARTER", 0.65));
    airlines.push(new Airline("FLYDUBAI", 0.77));
    airlines.push(new Airline("FREEBIRD AIRLINES", 0.68));
    airlines.push(new Airline("FROST AIR", 0.764));
    airlines.push(new Airline("LUFTHANSA", 0.73));
    airlines.push(new Airline("GRANAVI", 0.70));
    airlines.push(new Airline("ISRAIR AIRLINES", 0.86));
    airlines.push(new Airline("ALITALIA", 0.677));
    airlines.push(new Airline("LOT", 0.70));
    airlines.push(new Airline("NEOS S.P.A", 0.68));
    airlines.push(new Airline("NESMA AIRLINES", 0.722));
    airlines.push(new Airline("NORWEGIAN AIR", 0.79));
    airlines.push(new Airline("PEGASSUS AIRLINES", 0.80));
    airlines.push(new Airline("QATAR AIRWAYS", 0.89));
    airlines.push(new Airline("RYANAIR", 0.84));
    airlines.push(new Airline("SKY EXPRESS", 0.78));
    airlines.push(new Airline("SUNDAIR", 0.69));
    airlines.push(new Airline("SUN EXPRESS", 0.66));
    airlines.push(new Airline("SWISS INTERNATIONAL AIRLINES", 0.6322));
    airlines.push(new Airline("TAROM - ROMANIAN AIR TRANSPORT", 0.70));
    airlines.push(new Airline("TRANSAVIA", 0.6466));
    airlines.push(new Airline("TURKISH AIRLINES", 0.71));
    airlines.push(new Airline("TUS AIRWAYS", 0.723));
    airlines.push(new Airline("WIZZ AIR", 0.6381));
    
    weather.push(new Weather("Rain", 0.2));
    weather.push(new Weather("Snow", 0.4));
    weather.push(new Weather("Clear", 0.1));
}

async function getWeather(dateTime, city) {
    try {
        // Get latitude and longitude from Open-Meteo Geocoding API
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            alert("City not found!");
            return;
        }

        const { latitude, longitude } = geoData.results[0];

        // Get weather data
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weather_code`);
        const weatherData = await weatherResponse.json();

        // Find the closest hour to user input
        const hours = weatherData.hourly.time;
        const temperatures = weatherData.hourly.temperature_2m;
        const weatherCode = weatherData.hourly.weather_code;

        let closestIndex = hours.findIndex(hour => hour.startsWith(dateTime));

        if (closestIndex === -1) {
            alert("Weather data not available for this time.");
            return;
        }

        currentFlight.temperature = temperatures[closestIndex];
        currentFlight.weatherCode = weatherCode[closestIndex];


    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching weather data. Try again.");
    }
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

    let percentage = (0.90 * (1-airlineDelay)) + (0.5 * airportDelay) + (0.5 * weatherDelay);
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

        var dateTime = flight.flight_date;
        var city = flight.departure.city;

        currentFlight = new Flight(
            flight.flight.iata, 
            flight.airline.name.toUpperCase(), 
            flight.departure.airport, 
            flight.arrival.airport, 
            flight.flight_date, 
            flight.flight_status
        );

        getWeather(dateTime, city);


        document.getElementById("flightInfo").innerHTML = `
            <p><strong>Flight:</strong> ${flight.flight.iata} (${flight.airline.name})</p>
            <p><strong>From:</strong> ${flight.departure.airport} (${flight.departure.iata})</p>
            <p><strong>To:</strong> ${flight.arrival.airport} (${flight.arrival.iata})</p>
            <p><strong>Current:</strong> ${flight.flight_status}</p>
            <p><strong>Flight Date:</strong> ${flight.flight_date || "N/A"}</p>
            <p><strong>Scheduled Departure:</strong> ${flight.departure.scheduled || "N/A"}</p>
            <p><strong>Arrival Delay:</strong> ${flight.arrival.delay || "No delay reported"}</p>
            <p><strong>Risk of delay:</strong> ${calculate()}</p>
            <p><strong>Temp:</strong> ${currentFlight.temperature}</p>
            <p><strong>Pre:</strong> ${currentFlight.precipitation}</p>
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
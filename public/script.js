var currentFlight;
var airports = [];
var airlines = [];
var weather = [];
var months = [];

var airlineDelay = 0.0;
var airportDelay = 0.0;
var weatherDelay = 0.0;
var monthDelay = 0.0;

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
    constructor(flightNumber, airlineName, departureAirport, arrivalAirport, flightDate, currentStatus, monthName) {
        this.flightNumber = flightNumber;
        this.airlineName = airlineName;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.flightDate = flightDate;
        this.currentStatus = currentStatus;
        this.weatherCode = getWeather();
        this.monthName = monthName;
    }
}

class Month {
    constructor(name, delayRate) {
        this.name = name;
        this.delay = delayRate;
    }
}

function updateLists() {
    airports.push(new Airport("Sofia", 0.18));
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

    months.push(new Month("01", 0.13));
    months.push(new Month("02", 0.12));
    months.push(new Month("03", 0.11));
    months.push(new Month("04", 0.14));
    months.push(new Month("05", 0.14));
    months.push(new Month("06", 0.16));
    months.push(new Month("07", 0.19));
    months.push(new Month("08", 0.21));
    months.push(new Month("09", 0.16));
    months.push(new Month("10", 0.16));
    months.push(new Month("11", 0.18));
    months.push(new Month("12", 0.26));
}

function getWeather() {
    return Math.random();
}

function reset() {
    let userData = document.getElementById("userdata");
    userData.style.display='none';

    let searchBar = document.getElementById("searchbar");
    searchBar.style.display='flex';

    let input = document.getElementById("flightNumber");
    input.value = "";
}

function start() {
    let start = document.getElementById("startbutton");
    start.style.display='none';

    let searchBar = document.getElementById("searchbar");
    searchBar.style.display='flex';
}

/* async function getWeather(dateTime, city) {
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
} */


function calculateDelay() {
    let airline = airlines.find(item => item.name === currentFlight.airlineName);
    airlineDelay = airline ? 1 - airline.delayRate : 0.0;

    let airport = airports.find(item => item.name === currentFlight.departureAirport);
    airportDelay = airport ? airport.delayRate : 0.0;

    if (currentFlight.weatherCode < 50) weatherDelay = 0.1;
    else if (currentFlight.weatherCode < 80) weatherDelay = 0.3;
    else weatherDelay = 0.45;

    let month = months.find(item => item.name === currentFlight.monthName);
    monthDelay = month ? month.delay : 0.0;

    let percentage = (0.85 * airlineDelay) + (0.05 * airportDelay) + (0.05 * weatherDelay) + (0.05 * monthDelay);
    return percentage;
}

async function getFlightByNumber(flightNumber) {
    updateLists();

    const API_KEY = "f4da060f7bf36786afc535e0571e19c9";
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.data.length === 0) {
            document.getElementById("flightInfo").innerText = "No flight found.";
            return;
        }

        var flight = data.data[0];
        var date = flight.flight_date;
        var month = date.substring(5,7);

        currentFlight = new Flight(
            flight.flight.iata, 
            flight.airline.name.toUpperCase(), 
            flight.departure.airport, 
            flight.arrival.airport, 
            flight.flight_date, 
            flight.flight_status,
            month
        );

        let delay = calculateDelay();
        let delayPercent = (delay * 100).toFixed(0) + "%";
        let delayRisk = "Low";
        let color = "success";
        
        if (delay > 0.3 && delay < 0.7) {
            delayRisk = "Medium";
            color = "warning";
        }
        else if (delay >= 0.7) {
            delayRisk = "High";
            color = "danger";
        }

        console.log(currentFlight);

        let searchBar = document.getElementById("searchbar");
        searchBar.style.display='none';

        let userData = document.getElementById("userdata");
        userData.style.display='flex';

        let background = document.getElementById("background");
        background.id = 'background-lower';

        document.getElementById("probability").innerHTML = `
            <h3>Your flight has a <strong>${delayRisk}</strong> chance of being delayed</h3>
        `;

        var delays = "";
        var isDelayed = false;
        var delayInfo = "";
        if (airlineDelay > 0.5) {
            delays += "High chance of airline delays<br />";
            isDelayed = true;
        }
        if (airportDelay > 0.5) {
            delays += "High chance of airline delays<br />";
            isDelayed = true;
        }
        if (weatherDelay > 0.5) {
            delays += "High chance of airline delays<br />";
            isDelayed = true;
        }
        if (monthDelay > 0.5) {
            delays += "High chance of airline delays<br />";
            isDelayed = true;
        }

        if (isDelayed == true) delayInfo += " due to the following reasons:";

        document.getElementById("delay-reasons").innerHTML = `

            <h4>Your flight from ${currentFlight.departureAirport} to ${currentFlight.arrivalAirport} has a ${delayPercent} chance of delay${delayInfo}</h4>
            ${delays}
        `;

        document.getElementsByClassName("progress").innerHTML = `
            <div class="progress-bar bg-${color}" role="progressbar" style="width: ${delayPercent}" aria-valuenow="${delay * 100}" aria-valuemin="0" aria-valuemax="100"></div>
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
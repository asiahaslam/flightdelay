using System.IO.Compression;
using System.Numerics;
using Microsoft.AspNetCore.Mvc;

public class Airline {
    public string code;
    public string name;

    public double delayRisk;

    public Airline(string cd, string nm, double delay) {
        code = cd;
        name = nm;
        delayRisk = delay;
    }

    public Airline(string cd) {
        code = cd;
        name = "Sofia";
    }
}
public class AirlineList {
    public List<Airline> airlineList;

    public AirlineList() {
        airlineList = new List<Airline>();
        // open csv file to process names
        Airline line1 = new Airline("A3", "AEGEAN AIRLINES, S.A", .96);
        Airline line2 = new Airline("BT", "AIR BALTIC", .60);
        Airline line3 = new Airline("JU", "AIR SERBIA", .5771);
        Airline line4 = new Airline("IZ", "AKRIA ISRELI INLAND AIRLINES LTD", .67);
        airlineList.Add(line1);
        airlineList.Add(line2);
        airlineList.Add(line3);
        airlineList.Add(line4);
    }

    public string findName(string code) {
        string result="default";
    foreach(Airline airline in airlineList)
    {   
        if (airline.code == code) 
            result = airline.name;
    }
    return result;
}
}


[Route("api/hello")]  // Matches API URL: http://localhost:5038/api/hello/airline
[ApiController]
public class HelloController : ControllerBase
{

    private AirlineList airline = new AirlineList();

    [HttpPost("airline")]

    public IActionResult ReverseString([FromBody] InputModel input)
    {
        if (input == null || string.IsNullOrWhiteSpace(input.Text))
        {
            return BadRequest(new { message = "Invalid input" });
        }

        
        // Return name of airport
        string code = input.Text.Substring(0,2);
        
        string nameOfAirline = airline.findName(code);

        return Ok(new { findAirline = nameOfAirline });
    }
}

// Model to receive JSON input
public class InputModel
{
    public string Text { get; set; }
}

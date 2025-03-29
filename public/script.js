function sendToBackend() {
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
}
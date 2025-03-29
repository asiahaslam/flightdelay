function fetchMessage() {
    fetch("http://localhost:5038/api/hello") // Ensure this URL matches your backend
        .then(response => response.json()) 
        .then(data => {
            document.getElementById("message").innerText = data.message;
        })
        .catch(error => console.error("Error fetching data:", error));
}
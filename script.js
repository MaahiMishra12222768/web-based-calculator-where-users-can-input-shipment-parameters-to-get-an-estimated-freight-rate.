
document.getElementById("calculateBtn").addEventListener("click", function() {
    // Get values from form fields
    const weight = parseFloat(document.getElementById("weight").value);
    const distance = parseFloat(document.getElementById("distance").value);
    const carrier = document.getElementById("carrier").value;
    const resultDiv = document.getElementById("result");
    const errorMessageDiv = document.getElementById("error-message") || createErrorDiv();

    // Clear previous messages
    resultDiv.textContent = "";
    errorMessageDiv.textContent = "";

    // validation
    if (isNaN(weight) || isNaN(distance) || weight <= 0 || distance <= 0) {
        errorMessageDiv.textContent = "Please enter valid positive numbers for weight and distance.";
        return;
    }

    // rates per kg per km based on carrier
    const ratePerKgKm = getRatePerKgKm(carrier);
    if (!ratePerKgKm) {
        errorMessageDiv.textContent = "Invalid carrier type selected.";
        return;
    }

    // Show a loading message
    resultDiv.textContent = "Calculating...";

    // Simulate a slight delay for better design
    setTimeout(() => {
        const totalCost = weight * distance * ratePerKgKm;
        resultDiv.textContent = `Estimated Freight Rate: ₹${totalCost.toFixed(2)}`;
    }, 500);
});

// Helper function to create error message div if it doesn't exist
function createErrorDiv() {
    const errorDiv = document.createElement("div");
    errorDiv.id = "error-message";
    document.querySelector(".container").appendChild(errorDiv);
    return errorDiv;
}

// Helper function to determine rate based on carrier type
function getRatePerKgKm(carrier) {
    switch (carrier) {
        case "ground":
            return 1; // Rate in rupees for ground
        case "air":
            return 1.5; // Rate in rupees for air
        case "express":
            return 2; // Rate in rupees for express
        default:
            return null;
    }
}

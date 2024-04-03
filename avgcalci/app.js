const express = require("express");
const fetch = require("node-fetch-commonjs"); // Import node-fetch-commonjs
const app = express();
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;

// Test server API endpoints
const TEST_SERVER_API_URLS = {
  even: "http://20.244.56.144/test/e", // Corrected URL for fetching even numbers
  primes: "http://20.244.56.144/test/primes",
};

// Placeholder for storing numbers
let storedNumbers = [];

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for /numbers/{numberid}
app.get("/numbers/:numberid", async (req, res) => {
  try {
    // Fetch numbers from third-party server
    const numbers = await fetchNumbers(req.params.numberid);

    // Store numbers, calculate average, and update window state
    const { windowPrevState, windowCurrState, avg } = processNumbers(numbers);

    // Respond with the formatted response
    res.json({
      windowPrevState,
      windowCurrState,
      numbers: numbers, // Corrected to use the fetched numbers
      avg: avg.toFixed(2), // Format average to 2 decimal places
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Function to fetch numbers from third-party server
async function fetchNumbers(numberId) {
  try {
    // Simulating fetching numbers from a third-party API
    let response;
    switch (numberId) {
      case "e": // Even numbers
        response = await fetch(TEST_SERVER_API_URLS.even); // Use correct URL from TEST_SERVER_API_URLS
        break;
      case "p": // Prime numbers
        response = await fetch(TEST_SERVER_API_URLS.primes);
        break;
      // Add cases for other number types ('f', 'r') if needed
      default:
        throw new Error("Invalid numberId");
    }
    const data = await response.json();

    return data.numbers;
  } catch (error) {
    console.error("Error fetching numbers:", error);
    throw new Error("Failed to fetch numbers");
  }
}

// Function to process numbers and calculate averages
function processNumbers(numbers) {
  // Store the received numbers
  storedNumbers.push(...numbers);

  // If stored numbers exceed the window size, remove the oldest numbers
  if (storedNumbers.length > WINDOW_SIZE) {
    storedNumbers = storedNumbers.slice(storedNumbers.length - WINDOW_SIZE);
  }

  // Calculate the average of stored numbers
  const sum = storedNumbers.reduce((acc, num) => acc + num, 0);
  const avg = sum / storedNumbers.length;

  // Return the previous and current window states, and the average
  return {
    windowPrevState: storedNumbers.slice(0, -numbers.length),
    windowCurrState: storedNumbers,
    avg,
  };
}

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server; // Export the server for testing purposes

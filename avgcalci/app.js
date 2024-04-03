const express = require("express");
const fetch = require("node-fetch-commonjs"); 
const app = express();
const PORT = process.env.PORT || 9876;
const WINDOW_SIZE = 10;

// Test server API endpoints
const TEST_SERVER_API_URLS = {
  even: "http://20.244.56.144/test/e",
  primes: "http://20.244.56.144/test/primes",
};


let storedNumbers = [];

app.use(express.json());


app.get("/numbers/:numberid", async (req, res) => {
  try {
  
    const numbers = await fetchNumbers(req.params.numberid);

  
    const { windowPrevState, windowCurrState, avg } = processNumbers(numbers);

   
    res.json({
      windowPrevState,
      windowCurrState,
      numbers: numbers, 
      avg: avg.toFixed(2), 
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


async function fetchNumbers(numberId) {
  try {
  
    let response;
    switch (numberId) {
      case "e": // Even numbers
        response = await fetch(TEST_SERVER_API_URLS.even); 
        break;
      case "p": // Prime numbers
        response = await fetch(TEST_SERVER_API_URLS.primes);
        break;
   
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


function processNumbers(numbers) {
  // Store the received numbers
  storedNumbers.push(...numbers);

  if (storedNumbers.length > WINDOW_SIZE) {
    storedNumbers = storedNumbers.slice(storedNumbers.length - WINDOW_SIZE);
  }

  const sum = storedNumbers.reduce((acc, num) => acc + num, 0);
  const avg = sum / storedNumbers.length;

 
  return {
    windowPrevState: storedNumbers.slice(0, -numbers.length),
    windowCurrState: storedNumbers,
    avg,
  };
}


const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = server;

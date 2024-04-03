# Average Calculator Microservice

This project implements an Average Calculator microservice that exposes a REST API for calculating averages of different types of numbers. The microservice fetches numbers from a third-party server, stores them, and calculates the average based on a specified window size.

## Features

- Exposes a REST API endpoint (`/numbers/{numberid}`) to calculate averages of different types of numbers.
- Handles qualified number IDs such as 'p' for prime, 'f' for Fibonacci, 'e' for even, and 'r' for random numbers.
- Configurable window size to limit the number of stored numbers.
- Fetches numbers from a third-party server and stores them. Avoids duplicates and handles errors gracefully.
- Provides responses with the numbers stored before and after the latest API call, along with the average of numbers matching the window size.

## Technologies Used

- Node.js
- Express.js
- node-fetch (for making HTTP requests)
- Jest (for testing)
- Supertest (for testing HTTP requests)

## Usage

To use this microservice, follow these steps:

1. Clone the repository:

`git clone <repository_url>`

2. Install dependencies:

`npm install`

3. Run the microservice:

`npm start`

4. The microservice will be running at http://localhost:9876 by default.

5. Use a tool like curl or Postman to make requests to the API endpoints. For example:

`GET http://localhost:9876/numbers/e`


## Testing

To run tests for this microservice, execute:

  `npm test`

This will run the Jest tests located in the `app.test.js` file.


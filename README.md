

# KoinX Backend Internship Assignment

## Overview

This project is a server-side application built with **Node.js** and **MongoDB** as part of the KoinX backend internship assignment. It consists of the following major features:

1. A **background job** to fetch and store cryptocurrency data.
2. Two APIs:
   - `/stats`: To retrieve the latest cryptocurrency stats.
   - `/deviation`: To calculate the standard deviation of cryptocurrency prices from the last 100 records.

## Features

### Task 1: Background Job

A background job is implemented to:
- Fetch the following data for three cryptocurrencies (`bitcoin`, `matic-network`, and `ethereum`) every 2 hours:
  - Current price in USD
  - Market cap in USD
  - 24-hour percentage change
- Data is fetched using the [CoinGecko API](https://docs.coingecko.com/v3.0.1/reference/introduction) and stored in a **MongoDB** database.

### Task 2: `/stats` API

- **Endpoint**: `/stats`
- **Query Parameters**:
  - `coin`: The ID of the cryptocurrency (`bitcoin`, `matic-network`, or `ethereum`).
- **Response**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

### Task 3: `/deviation` API

- **Endpoint**: `/deviation`
- **Query Parameters**:
  - `coin`: The ID of the cryptocurrency (`bitcoin`, `matic-network`, or `ethereum`).
- **Functionality**: Calculates the standard deviation of the prices of the specified cryptocurrency from the last 100 records stored in the database.
- **Response Example**:
  ```json
  {
    "deviation": 4082.48
  }
  ```

## Technical Stack

- **Language**: JavaScript (ES Modules)
- **Framework**: Node.js (Express.js)
- **Database**: MongoDB (Using Mongoose for schema modeling)
- **API Source**: CoinGecko API

## Installation and Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v18+)
- npm
- MongoDB (or MongoDB Atlas for cloud deployment)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following:
   ```plaintext
   MONGO_URI=<your_mongo_db_connection_string>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── controller/
│   ├── Deviation.controller.js       # Handles requests for /deviation API
│   ├── Stats.controller.js           # Handles requests for /stats API
├── helper/
│   ├── Bitcoin.price.update.js       # Background job to fetch Bitcoin prices
│   ├── Etherium.price.update.js      # Background job to fetch Ethereum prices
│   ├── Matic.price.update.js         # Background job to fetch Matic prices
├── model/
│   ├── CoinPrice.model.js            # Mongoose schema for storing cryptocurrency prices
├── services/
│   ├── deviationService.js           # Logic to calculate standard deviation
├── utils/
│   ├── CoinGeckService.util.js       # Fetches data from CoinGecko API
├── index.js                          # Main entry point
```

## How It Works

### Background Job
The background job runs every 2 hours (using `node-cron`) to fetch data for the three cryptocurrencies from CoinGecko and save it in MongoDB. Each entry includes:
- Coin ID
- Current price
- Market cap
- 24-hour change

### `/stats` API
- Queries MongoDB for the latest entry of the specified cryptocurrency.
- Returns the requested data in JSON format.

### `/deviation` API
- Fetches the last 100 price records of the specified cryptocurrency from MongoDB.
- Computes the standard deviation of prices using a mathematical formula.

### Error Handling
- The application handles missing parameters, invalid cryptocurrency IDs, API failures, and rate limits gracefully.
- Implements retry logic with exponential backoff for API requests that fail with `429 Too Many Requests`.

## Deployment (Optional Tasks)

- **MongoDB Atlas**: Deployed The database  using MongoDB Atlas for cloud-based storage.
- **Backend Deployment**: The backend is deployed on Render for public access

## Example .env File
```plaintext
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/koinx
```

## Improvements
1. **Caching**: Use an in-memory database (e.g., Redis) for faster data retrieval and reduced API calls.
2. **Load Balancing**: Distribute requests across multiple servers to handle high traffic.
3. **Unit Tests**: Implement tests for controllers and services using tools like Mocha or Jest.
4. **Scalability**: Introduce microservices for modular design.

## Conclusion
This project demonstrates the ability to:
- Design and implement a scalable backend.
- Integrate third-party APIs effectively.
- Solve real-world problems with clean and maintainable code.

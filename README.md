This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## Setting Up Instagram Replica

Follow these steps to set up and run the instagram-replica app locally and connect it to MongoDB. The following are local setup instructions to use Docker, follow the instructions for running with Docker below

### Step 1: Clone the Repository

1. Clone the repository to your local machine using Git:
   ```
   git clone https://github.com/tkadima/instagram-replica.git
   ```

### Step 2: Install Dependencies

1. Navigate to the project directory:
   ```
   cd instagram-replica
   ```

2. Install project dependencies using npm:
   ```
   npm install
   ```

### Step 3: Set Up MongoDB

1. Install MongoDB on your local machine. You can download it from [MongoDB Community Download](https://www.mongodb.com/try/download/community).

2. Start MongoDB by running the following command in your terminal:
   ```
   mongod
   ```

### Step 4: Configure MongoDB Connection

1. Open the `/utils/mongo.mjs` file.

2. Update the MongoDB connection string to connect to the MongoDB server running locally. By default, the connection string is:
   ```javascript
   const uri = 'mongodb://localhost:27017';
   ```

### Step 5: Seed the Database (Optional)

1. See the database with data from the private API by running the following command in your terminal: 
```
npm run seed
```

### Step 6: Start the Next.js App

1. Start the Next.js app by running the following command in your terminal:
   ```
   npm run dev
   ```
Open your web browser and navigate to `http://localhost:3000` to view your Next.js app.

# How to run the app using Docker 
### Run with Docker
1. Build and start container
Run the following command in the terminal while in the project directory 
```sh 
docker-compose up --build
```
2. Run the seed script (as needed)
This step only needs to be done once after the first local build
```sh
docker-compose run seed
```

# How to Run Tests

## Testing Framework

This project uses [Jest](https://jestjs.io/) for testing, with support for both TypeScript and ES modules.

## Running Tests

To run the tests, use the following command:

```sh
npm run test

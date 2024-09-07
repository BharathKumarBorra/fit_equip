require("dotenv").config(); // Load environment variables

const app = require("./app"); // Import the app
const connectToDatabase = require("./config/db"); // Import database connection

const startServer = () => {
  const PORT = process.env.PORT || 5000; // Default to port 5000 if not in .env
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

const initializeDBAndServer = async () => {
  await connectToDatabase(); // Connect to MongoDB
  startServer(); // Start the server
};

initializeDBAndServer(); // Execute the initialization function

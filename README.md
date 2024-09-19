---

# Fit Equip Application

Welcome to the Fit Equip Application! This application helps users discover exercises based on the equipment they have and the body part they want to train. Users can search for equipment, select their preferences, and get a list of recommended exercises.

## Features

- **Search Equipment**: Find equipment by name and add it to your selection.
- **Select Body Part**: Choose the body part you want to focus on.
- **Specify Number of Exercises**: Define how many exercises you want to see.
- **Get Exercises**: Retrieve a list of exercises tailored to your equipment and body part selection.
- **View Instructions**: Access detailed instructions and videos for each exercise.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS
- **Icons**: React Icons

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/BunnyBharath91/fit_equip.git
   cd fit-equip
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Create a `.env` File**

   Create a `.env` file in the `backend` directory and add your MongoDB URI:

   ```plaintext
   MONGO_URI=your_mongodb_uri
   PORT=5000
   ```

5. **Run the Backend Server**

   ```bash
   npm start
   ```

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend Server**

   ```bash
   npm start
   ```

The application should now be running at `http://localhost:3000` (or the port specified in your `frontend` configuration).

## Usage

1. **Search for Equipment**: Enter the equipment name in the search box and select from the search results.
2. **Select Body Part**: Click on the body part selector and choose the target area.
3. **Specify Number of Exercises**: Input the number of exercises you want.
4. **Get Exercises**: Click the "Get Exercises" button to fetch and view exercises.
5. **View Instructions**: Click the arrow icon to reveal instructions and video for each exercise.

## API Endpoints

- **GET /equipments**: Search for equipment by name.
  - Query Parameter: `name`
  - Example: `/equipments?name=dumbbell`

- **GET /exercises**: Get exercises based on selected equipment, body part, and number of exercises.
  - Query Parameters: `equipments`, `bodyPart`, `limit`
  - Example: `/exercises?bodyPart=chest&limit=5&equipments=dumbbell,barbell`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact [bharathkumarborra1@gmail.com](mailto:bharathkumarborra1@gmail.com).

---

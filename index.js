const express = require('express');
const app = express();
const sequelize=require('./db/connection');
const cors = require('cors');
require('dotenv/config');
const authRoutes = require('./routes/authRoute');
/*const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./app/middleware/authMiddleware');*/

// Express middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Register the user routes (protected by authentication)
//app.use('/users', authenticateToken, userRoutes);


app.use('/auth', authRoutes);



// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: true });
console.log("All models were synchronized successfully.");

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

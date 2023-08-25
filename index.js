const express = require('express');
const app = express();
const sequelize = require('./db/connection');
const cors = require('cors');
require('dotenv/config');
const authRoutes = require('./routes/authRoute');
const deleteExpiredTokens = require('./scheduled_tasks/deleteExpiredTokens');
const cookieParser = require('cookie-parser');


// Express middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/api/auth', authRoutes);

app.use('/', (req, res) => {
    res.send('Welcome to the API');
});


// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection established successfully!');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync();
console.log("All models were synchronized successfully.");

// Start the token deletion job
deleteExpiredTokens();

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

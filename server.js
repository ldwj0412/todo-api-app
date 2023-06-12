require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const registerRoutes = require('./routes/authen');
const authenControllers = require('./controllers/authen');
const User = require('./models/User');
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Routes
app.use('/', registerRoutes);
app.use('/todos', todoRoutes);


// Error handler, put at the bottom
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});



const PORT = process.env.PORT || 5000;
const server=app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
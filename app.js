// Require environment configuration
require('dotenv').config();

// App Module
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Require mongoose configuration
require('./db/mongoose');

// Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// Generate base API route
const generateApiRoute = (route) => `/api/v1/${route}`;

app.use(generateApiRoute('user'), userRoutes);
app.use(generateApiRoute('post'), postRoutes);

// Server initialization
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});
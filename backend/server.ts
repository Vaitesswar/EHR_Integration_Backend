// Import packages
const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors');

// Configuration
dotenv.config();
const app = express();
const hostname = process.env.hostname;
const port = process.env.port;
app.use(cors({origin: process.env.cors}));
app.use(express.json()); // For properly formatting the request into json
const keycloak = require('./config/keycloak-config.ts').initKeycloak();
app.use(keycloak.middleware());

// Database connection
const connectDb = require("./config/dbConnection");
connectDb();

// REST API routes
app.use("/patients", require("./restAPI/patientRoutes"));
app.use("/doctors", require("./restAPI/doctorRoutes"));
app.use("/appointments", require("./restAPI/appointmentRoutes"));
app.use("", require("./restAPI/userRoutes"));

/*
 GraphQL routes
const { ApolloServer} = require("apollo-server-express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const server = new ApolloServer ({ typeDefs,resolvers });
server.applyMiddleware({ app });
*/

// Running the application in server
app.listen(port, hostname, () => {
    console.log(`Server running on port http://${hostname}:${port}`);
})

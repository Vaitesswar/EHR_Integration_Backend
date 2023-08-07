// Import packages
var express = require("express");
var dotenv = require("dotenv");
var cors = require('cors');

// Configuration
dotenv.config();
var app = express();
app.use(cors({origin: process.env.cors}));
app.use(express.json()); // For properly formatting the request into json
var keycloak = require('./config/keycloak-config.ts').initKeycloak();
app.use(keycloak.middleware());

// Database connection
const dbConnection = require("./config/dbConnection");
dbConnection();

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

module.exports = app;
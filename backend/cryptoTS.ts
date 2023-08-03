var jwt = require('jsonwebtoken');
const fs = require('fs');
const axios = require("axios");

// Encoding
const curTime = Math.ceil(Date.now()/1000); // in seconds (NOT MILLISECONDS)

const claims = {
  "iss": "ca786b00-aa78-4002-9c49-99a00d449edc", // Client ID
  "sub": "ca786b00-aa78-4002-9c49-99a00d449edc", // Client ID
  "aud": "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token",
  "jti": Math.random().toString(21).slice(2), // Unique identifier
  "exp": curTime + 240, // 4 minutes from now (Expiration time integer for this authentication JWT, expressed in seconds)
  "nbf": curTime - 1, // Time integer before which the JWT must not be accepted for processing, expressed in seconds
  "iat": curTime // Time integer for when the JWT was created, expressed in seconds
  }

const privateKey = fs.readFileSync("privatekey.pem");
const JWT = jwt.sign(claims, privateKey, { algorithm: 'RS384' });
console.log(JWT);

// Decoding
const publicKey = fs.readFileSync("publickey509.pem");
var decoded = jwt.verify(JWT, publicKey);
console.log(decoded);

// HTTP Requests

async function getPatient(access_token) {
  var data = {};
  await axios.get("https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/Patient/erXuFYUfucBZaryVksYEcMg3", 
  { headers: { Authorization: `Bearer ${access_token}` } }
  )
  .then(function(response) {
    console.log(response.data.id,response.data.name[0].text)
    data[response.data.id] = response.data.name[0].text;
  }).catch(function(error) {
    console.log("ERROR");
  }).finally(() => {
    console.log(data);
    return data;
  })
  }

async function login(JWT){
  var access_token = "";
  var data = {};
  await axios.post("https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token", {
    "grant_type": "client_credentials",
    "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
    "client_assertion": JWT
  }, {
  headers: { 
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then(function(response) {
    access_token = response.data.access_token;
  }).catch(function(error) {
    console.log(error)
  }).finally(() => {
    console.log(access_token);
    data = getPatient(access_token);
    console.log(data);
    return data;
  })
}

async function getData(JWT) {
  var data = await login(JWT);
  return data;
}

console.log(getData(JWT));



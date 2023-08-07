var jwt = require('jsonwebtoken');
var fs = require('fs');
var axios = require("axios");
var asyncHandler = require("express-async-handler");
var Patient = require("../models/patientModel");
var Appointment = require("../models/appointmentModel");

var getPatients = asyncHandler(async (req:any, res:any) => {
    //const patients = await Patient.find();
    //res.status(200).json(patients);

    // Encoding
    const curTime = Math.ceil(Date.now()/1000); // in seconds (NOT MILLISECONDS)

    const claims = {
    "iss": process.env.EHR_CLIENT_ID, // Client ID
    "sub": process.env.EHR_CLIENT_ID, // Client ID
    "aud": process.env.LOGIN_EHR_URL,
    "jti": Math.random().toString(21).slice(2), // Unique identifier
    "exp": curTime + 240, // 4 minutes from now (Expiration time integer for this authentication JWT, expressed in seconds)
    "nbf": curTime - 1, // Time integer before which the JWT must not be accepted for processing, expressed in seconds
    "iat": curTime // Time integer for when the JWT was created, expressed in seconds
    }

    const privateKey = fs.readFileSync("./privatekey.pem");
    const JWT = jwt.sign(claims, privateKey, { algorithm: 'RS384' });

    // Decoding
    //const publicKey = fs.readFileSync("./publickey509.pem");
    //var decoded = jwt.verify(JWT, publicKey);
    //console.log(decoded);

    // HTTP Requests
    async function getPatientInfo(access_token:any, patientID:any) {
        const response = await axios.get(`${process.env.PATIENT_EHR_URL}/${patientID}`, 
        { headers: { Authorization: `Bearer ${access_token}` } }
        )
        var data = {"id":response.data.id, "name":response.data.name[0].text};
        return data;
    }

    async function loginPatient(JWT:any){
        const response = await axios.post(process.env.LOGIN_EHR_URL, {
            "grant_type": "client_credentials",
            "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            "client_assertion": JWT
        }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const access_token = response.data.access_token;
        const patient1 = await getPatientInfo(access_token, "erXuFYUfucBZaryVksYEcMg3");
        const patient2 = await getPatientInfo(access_token, "eq081-VQEgP8drUUqCWzHfw3");
        const patient3 = await getPatientInfo(access_token, "eAB3mDIBBcyUKviyzrxsnAw3");
        const patient4 = await getPatientInfo(access_token, "egqBHVfQlt4Bw3XGXoxVxHg3");
        const patient5 = await getPatientInfo(access_token, "eIXesllypH3M9tAA5WdJftQ3");
        const patient6 = await getPatientInfo(access_token, "eh2xYHuzl9nkSFVvV3osUHg3");
        const patient7 = await getPatientInfo(access_token, "e0w0LEDCYtfckT6N.CkJKCw3");
        var data = [patient1, patient2, patient3, patient4, patient5, patient6, patient7]
        return data;
    }

    const data = await loginPatient(JWT);
    res.status(200).json(data);;
})

var getPatient = asyncHandler(async (req:any, res:any) => {
    /*
    const patient = await Patient.findById(req.params.id);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    
    }
    res.status(200).json(patient);
    */

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

    const privateKey = fs.readFileSync("./privatekey.pem");
    const JWT = jwt.sign(claims, privateKey, { algorithm: 'RS384' });

    // Decoding
    //const publicKey = fs.readFileSync("./publickey509.pem");
    //var decoded = jwt.verify(JWT, publicKey);
    //console.log(decoded);

    // HTTP Requests
    async function getPatientInfo(access_token:any) {
        const response = await axios.get(`${process.env.PATIENT_EHR_URL}/${req.params.id}`, 
        { headers: { Authorization: `Bearer ${access_token}` } }
        )
        var data = [
            {"id":response.data.id, "name":response.data.name[0].text}
        ];
        return data;
    }

    async function loginPatient(JWT:any){
        const response = await axios.post(process.env.LOGIN_EHR_URL, {
            "grant_type": "client_credentials",
            "client_assertion_type": "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
            "client_assertion": JWT
        }, {
        headers: { 
            "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const access_token = response.data.access_token;
        const data = await getPatientInfo(access_token);
        return data;
    }

    const data = await loginPatient(JWT);
    res.status(200).json(data);
})

var createPatient = asyncHandler(async (req:any, res:any) => {
    const {name, email, contact, address} = req.body;
    if (!name || !email || !contact|| !address){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const patient = await Patient.create({
        name, 
        email, 
        contact,
        address
    })
    res.status(201).json(patient);
})

var updatePatient = asyncHandler(async (req:any, res:any) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    }

    const updatedPatient = await Patient.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedPatient);
})

var deletePatient = asyncHandler(async (req:any, res:any) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    }
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    const deletedAppointment = await Appointment.find({ "patientID": req.params.id });
    for (let appointment of deletedAppointment){
        await Appointment.findByIdAndDelete(appointment._id);
    }
    res.status(200).json(deletedPatient);
})

module.exports = 
{   getPatients, 
    getPatient, 
    createPatient, 
    updatePatient, 
    deletePatient   };
const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const Appointment = require("../models/appointmentModel");

const getPatients = asyncHandler(async (req:any, res:any) => {
    const patients = await Patient.find();
    res.status(200).json(patients);
})

const getPatient = asyncHandler(async (req:any, res:any) => {
    const patient = await Patient.findById(req.params.id);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json(patient);
})

const createPatient = asyncHandler(async (req:any, res:any) => {
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

const updatePatient = asyncHandler(async (req:any, res:any) => {
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

const deletePatient = asyncHandler(async (req:any, res:any) => {
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
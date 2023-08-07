var asyncHandler = require("express-async-handler");
var Appointment = require("../models/appointmentModel");
var Patient = require("../models/patientModel");
var Doctor = require("../models/doctorModel");

var getAppointments = asyncHandler(async (req:any, res:any) => {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
})

var getAppointment = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment){
        res.status(404);
        throw new Error("Appointment not found");
    }
    res.status(200).json(appointment);
})

var getByPatient = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.find({ "patientID": req.params.id });
    if (!appointment){
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json(appointment);
})

var getByDoctor = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.find({ "doctorID": req.params.id });
    if (!appointment){
        res.status(404);
        throw new Error("Doctor not found");
    }
    res.status(200).json(appointment);
})

var createAppointment = asyncHandler(async (req:any, res:any) => {
    const {patientID, doctorID, appointmentDateTime} = req.body;
    if (!patientID || !doctorID || !appointmentDateTime){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    /*
    const doctor = await Doctor.findById(doctorID);
    if (!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }
    
    const patient = await Patient.findById(patientID);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    }
    */

    const appointment = await Appointment.create({
        patientID, 
        doctorID, 
        appointmentDateTime
    })
    res.status(201).json(appointment);
})

var updateAppointment = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment){
        res.status(404);
        throw new Error("Appointment not found");
    };
    /*
    const doctor = await Doctor.findById(req.body.doctorID);
    if (!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }
    */

    const patient = await Patient.findById(req.body.patientID);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedAppointment);
})

var deleteAppointment = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment){
        res.status(404);
        throw new Error("Appointment not found");
    }
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAppointment);
})

module.exports = 
{   getAppointments, 
    getAppointment,
    getByPatient,
    getByDoctor,
    createAppointment, 
    updateAppointment, 
    deleteAppointment   };
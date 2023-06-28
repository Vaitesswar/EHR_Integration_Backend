const asyncHandler = require("express-async-handler");
const Appointment = require("../models/appointmentModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");

const getAppointments = asyncHandler(async (req:any, res:any) => {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
})

const getAppointment = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment){
        res.status(404);
        throw new Error("Appointment not found");
    }
    res.status(200).json(appointment);
})

const getByPatient = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.find({ "patientID": req.params.id });
    if (!appointment){
        res.status(404);
        throw new Error("Patient not found");
    }
    res.status(200).json(appointment);
})

const getByDoctor = asyncHandler(async (req:any, res:any) => {
    const appointment = await Appointment.find({ "doctorID": req.params.id });
    if (!appointment){
        res.status(404);
        throw new Error("Doctor not found");
    }
    res.status(200).json(appointment);
})

const createAppointment = asyncHandler(async (req:any, res:any) => {
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
    */

    const patient = await Patient.findById(patientID);
    if (!patient){
        res.status(404);
        throw new Error("Patient not found");
    }

    const appointment = await Appointment.create({
        patientID, 
        doctorID, 
        appointmentDateTime
    })
    res.status(201).json(appointment);
})

const updateAppointment = asyncHandler(async (req:any, res:any) => {
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

const deleteAppointment = asyncHandler(async (req:any, res:any) => {
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
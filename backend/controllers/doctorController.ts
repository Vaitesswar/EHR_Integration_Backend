const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

const getDoctors = asyncHandler(async (req:any, res:any) => {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
})

const getDoctor = asyncHandler(async (req:any, res:any) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }
    res.status(200).json(doctor);
})

const createDoctor = asyncHandler(async (req:any, res:any) => {
    const {name, specialty} = req.body;
    if (!name || !specialty){
        res.status(400);
        throw new Error("All fields are mandatory.");
    }
    const doctor = await Doctor.create({
        name, 
        specialty
    })
    res.status(201).json(doctor);
})

const updateDoctor = asyncHandler(async (req:any, res:any) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedDoctor);
})

const deleteDoctor = asyncHandler(async (req:any, res:any) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    const deletedAppointment = await Appointment.find({ "doctorID": req.params.id });
    for (let appointment of deletedAppointment){
        await Appointment.findByIdAndDelete(appointment._id);
    }

    res.status(200).json(deletedDoctor);
})

module.exports = 
{   getDoctors, 
    getDoctor, 
    createDoctor, 
    updateDoctor, 
    deleteDoctor   };
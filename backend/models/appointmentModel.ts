const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const appointmentSchema = mongoose.Schema({
    patientID: {
       //type: Schema.Types.ObjectId, 
       //ref: 'Patient',
       type: String,
       required: [true, "Please enter your patientID."],
    },
    doctorID: {
        type: String, 
        required: [true, "Please enter your doctorID."],
    },
    appointmentDateTime: {
        type: Date,
        required: [true, "Please enter the appointment date and time."],
    },
},
{
    timestamps: true,
}

)

module.exports = mongoose.model("Appointment", appointmentSchema);
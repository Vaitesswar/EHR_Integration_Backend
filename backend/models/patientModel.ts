const mongoose = require("mongoose");
const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
    },
    email: {
        type: String,
        required: [true, "Please enter your email address."],
    },
    contact: {
        type: String,
        required: [true, "Please enter your phone number."],
    },
    address: {
        type: String,
        required: [true, "Please enter your home address."],
    },
},
{
    timestamps: true,
}

)

module.exports = mongoose.model("Patient", patientSchema);
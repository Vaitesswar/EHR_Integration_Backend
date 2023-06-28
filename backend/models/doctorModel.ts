const mongoose = require("mongoose");
const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
    },
    specialty: {
        type: String,
        required: [true, "Please enter your specialty."],
    },
},
{
    timestamps: true,
}

)

module.exports = mongoose.model("Doctor", doctorSchema);
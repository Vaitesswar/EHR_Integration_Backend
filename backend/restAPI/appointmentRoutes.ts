const express = require("express");
const router = express.Router();
const {   getAppointments, 
          getAppointment,
          getByPatient,
          getByDoctor,
          createAppointment, 
          updateAppointment, 
          deleteAppointment   } = require("../controllers/appointmentController");

router.route('/').get(getAppointments).post(createAppointment);
router.route('/:id').get(getAppointment).put(updateAppointment).delete(deleteAppointment);
router.route('/byPatient/:id').get(getByPatient);
router.route('/byDoctor/:id').get(getByDoctor);
module.exports = router;
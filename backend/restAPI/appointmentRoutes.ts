const express = require("express");
const router = express.Router();
const keycloak = require('../config/keycloak-config.ts').getKeycloak();
const {   getAppointments, 
          getAppointment,
          getByPatient,
          getByDoctor,
          createAppointment, 
          updateAppointment, 
          deleteAppointment   } = require("../controllers/appointmentController");
//router.route('/').get(getAppointments);
router.route('/').get(keycloak.enforcer(['appointment-resource:view-scope'], {
                        resource_server_id: 'patient-api-client'
                    }), getAppointments);
router.route('/').post(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), createAppointment);
router.route('/:id').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getAppointment);
router.route('/:id').put(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), updateAppointment);
router.route('/:id').delete(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), deleteAppointment);
router.route('/byPatient/:id').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getByPatient);
router.route('/byDoctor/:id').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getByDoctor);
    
module.exports = router;
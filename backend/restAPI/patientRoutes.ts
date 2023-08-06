const express = require("express");
const router = express.Router();
const keycloak = require('../config/keycloak-config.ts').getKeycloak();
const {   getPatients, 
          getPatient, 
          createPatient, 
          updatePatient, 
          deletePatient   } = require("../controllers/patientController");

router.route('/').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getPatients);
router.route('/').post(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), createPatient);
router.route('/:id').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getPatient);
router.route('/:id').put(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), updatePatient);
router.route('/:id').delete(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), deletePatient);


module.exports = router;
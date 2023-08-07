var express = require("express");
var router = express.Router();
var keycloak = require('../config/keycloak-config.ts').getKeycloak();
var {   getDoctors, 
          getDoctor, 
          createDoctor, 
          updateDoctor, 
          deleteDoctor   } = require("../controllers/doctorController");

router.route('/').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getDoctors);
router.route('/').post(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), createDoctor);
router.route('/:id').get(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), getDoctor);
router.route('/:id').put(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), updateDoctor);
router.route('/:id').delete(keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), deleteDoctor);

module.exports = router;
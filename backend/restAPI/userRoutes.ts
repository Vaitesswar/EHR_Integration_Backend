const express = require("express");
const router = express.Router();

const keycloak = require('../config/keycloak-config.js').getKeycloak();

router.get('/user', keycloak.protect(), function(req, res){
    res.send("Hello User");
});

/*
router.get('/all-user', keycloak.enforcer(['patient-resource:view-scope'], {
    //resource_server_id: 'cura-api-client'
}), function(req, res){
    res.send("Hello All User");
});
*/

module.exports = router;
var express = require("express");
var router = express.Router();
var keycloak = require('../config/keycloak-config.ts').getKeycloak();

router.get('/user', keycloak.protect(), function(req:any, res:any){
    res.send("Hello User");
});


router.get('/allUser', keycloak.enforcer(['appointment-resource:view-scope'], {
    resource_server_id: 'patient-api-client'
}), function(req:any, res:any){
    res.send("Hello All User");
});

module.exports = router;
var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    "realm": 'predictz-realm',
    "auth-server-url": 'http://localhost:8080',
    "ssl-required": 'external',
    "resource": 'patient-app-client',
    "public-client": false,
    "confidential-port": 0,
    //"min-time-between-jwks-requests" : 0,
    //bearerOnly: true,
    //"secret": 'AeG32kXTSDeYRBJnb1ZDVJ193hSnFff7'
};

function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};
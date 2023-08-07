var session = require('express-session');
var Keycloak = require('keycloak-connect');

var keycloakConfig = {
    "realm": 'cura-realm',
    "auth-server-url": 'http://localhost:8080',
    "ssl-required": 'external',
    "resource": 'patient-api-client',
    "public-client": false,
    "confidential-port": 0,
    //"min-time-between-jwks-requests" : 0,
    //bearerOnly: true,
    "secret": 'cEZ6ExfI7boconYT4wIrH3KUdxEEngHX'
};

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

function initKeycloak() {
        return keycloak;
}

function getKeycloak() {
    return keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};
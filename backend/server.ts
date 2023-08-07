var app = require("./app.ts");
var hostname = process.env.hostname;
var port = process.env.port;

// Running the application in server
app.listen(port, hostname, () => {
    console.log(`Server running on port http://${hostname}:${port}`);
})

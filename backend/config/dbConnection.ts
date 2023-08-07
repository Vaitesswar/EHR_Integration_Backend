var { default: mongoose } = require("mongoose");

var connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Databasec connected:", 
                    connect.connection.host,
                    connect.connection.name
                    );
    } catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;
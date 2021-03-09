const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/DemoDB";

const connectDB = async() => {
    try {
        await mongoose.connect(uri,  {
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("DB CONNECTED ")
    } catch (error) {
        console.log(error.message);
    }
}

const admin = {
    firstName: "x",
    lastName: "y"
};

// const fname = admin.firstName;
// const lname = admin.lastName;
asserts (firstName,lastName)= admin

module.exports = connectDB;

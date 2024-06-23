const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNotebook?readPreference=primary";

//euta function lekhya ho junle database sanga connect garna sakos
const connectToMongo = () => {
    mongoose.connect(mongoURI)
        // console.log('Connected To Mongo Successfully')
        .then(() => console.log("Connected To Mongo Successfully"))
        .catch((e) => console.log(e.message));
};

module.exports = connectToMongo;
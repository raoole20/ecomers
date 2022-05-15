const mongoose = require('mongoose');

const dbConnect = async ()=>{
    const url = process.env.DB_MONGO;

    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Databses conection is readdy...");
    } catch (error) {
        console.log('err, databases conection');
    }
}

module.exports = dbConnect;
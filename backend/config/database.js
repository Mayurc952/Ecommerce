const mongoose = require("mongoose");

const connectDatabase = ( )=>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex:true})
//mongoose.connect('mongodb+srv://admin:admin123@cluster0.4mmot.mongodb.net/?retryWrites=true&w=majority')
   .then((data)=>{
    console.log(`Mongodb connected with server: ${data.connection.host}`);
}).catch((err)=>{
console.log(err);
})
}

module.exports = connectDatabase;
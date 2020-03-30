const mongoose = require('mongoose');

class MongoDb {


  connect() {
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/db_demo', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }
}
module.exports = MongoDb;
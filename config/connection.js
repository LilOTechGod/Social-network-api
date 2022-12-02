// const { connect, connection } = require('mongoose');

// const connectionString = 
//     process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

// connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });
const mongoose = require('mongoose');

//Wrap mongoose around local connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/social-networkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = mongoose.connection;
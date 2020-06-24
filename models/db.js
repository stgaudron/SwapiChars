const mongoose = require('mongoose');

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb+srv://stgaudron:swapitest@cluster0-zom7f.mongodb.net/Swapichars?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./char.model');

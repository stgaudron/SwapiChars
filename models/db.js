const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://stgaudron:swapitest@cluster0-zom7f.mongodb.net/Swapichars?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./char.model');

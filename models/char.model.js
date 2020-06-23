const mongoose = require('mongoose');

var charSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        minlength: 3,
        maxlength: 50,
    },
    birth_year: {
        type: String,
    },
    eye_color: {
        type: String,
    },
    gender: {
        type: String,
    },
    hair_color: {
        type: String,
    },
    height: {
        type: String,
    },
    mass: {
        type: String,
    },
    skin_color: {
        type: String,
    },
},
 {
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

charSchema.index({'$**': 'text'});

mongoose.model('Char', charSchema);

const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Char = mongoose.model('Char');

mongoose.set('useFindAndModify', false);

//CRUD Operations//

router.post('/', (req,res) => {
  const charparams = {
    name: req.body.name,
    birth_year: req.body.birth_year,
    eye_color: req.body.eye_color,
    gender: req.body.gender,
    hair_color: req.body.hair_color,
    height: req.body.height,
    mass: req.body.mass,
    skin_color: req.body.skin_color,
    }
  const char = new Char(charparams);
  char.save()
    .then((char) =>{
      res.status(200).json({char});
    })
    .catch(err =>{
      res.status(400).send('character creation failed');
    });
});

//deprecated, gets replaced by paginated search route//
// router.get('/all', (req,res) => {
//   Char.find(function(err, chars){
//     if(err) {
//       console.log(err);
//     } else {
//       res.json(chars);
//     }
//   });
// });

router.get('/:name', (req,res) => {
  Char.findOne({name: req.params.name}, (err, char) => {
    if (err) res.status(400).send(err)
    console.log(char);
    res.json(char)
  });
});

router.put('/:name', (req,res) => {
  Char.findOneAndUpdate({name: req.params.name}, req.body,  (err, char) => {
    if(err)
      return next(err);
    else {
      char.name = req.body.name;
      char.birth_year = req.body.birth_year;
      char.eye_color = req.body.eye_color;
      char.gender = req.body.gender;
      char.hair_color = req.body.hair_color;
      char.height = req.body.height;
      char.mass = req.body.mass;
      char.skin_color = req.body.skin_color;
      res.status(200).json({
        name: char.name,
        birth_year: char.birth_year,
        eye_color: char.eye_color,
        gender: char.gender,
        hair_color: char.hair_color,
        height: char.height,
        mass: char.mass,
        skin_color: char.skin_color
      })
    }
  });
});

router.delete('/:name', (req, res, next) => {
  Char.findOneAndRemove({name: req.params.name}, (err, char) => {
    if (err)
      return next(err);
    else {
      res.status(200).json({message: 'Deleted!'});
    }
  });
});

//Search any attibute with pagination handling


router.get('/', paginatedResults(Char), (req, res) => {
  res.json(res.paginatedResults)
});

function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const search = req.query.search

    console.log(page);
    console.log(limit);
    console.log(search);

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    if (typeof search === "undefined"){
      try {
        results.results = await model.find().limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }
    }
    else {
      try {
        results.results = await model.find({name: {$regex: new RegExp(search, "i")}})
          .limit(limit)
          .skip(startIndex).exec()
        res.paginatedResults = results
        next()
      } catch (e) {
        res.status(500).json({ message: e.message })
      }

    }
  }
}


module.exports = router;

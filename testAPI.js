let express = require ('express');
let router = express.Router();

let database = require("../database"); // pulls the database in
let ItemModel = require("../schema/item.js"); // variable for making something from item.js

// doc is what the get finds in the database
router.get("/", function(req, res, next) {
  console.log("doing a get");
  ItemModel
    .find({
      game:1
    })

    .then(doc => {
      console.log("get complete", doc[0])
      res.send({
        game: doc[0].game,
        squares: doc[0].squares,
        xIsNext: doc[0].xIsNext
      })
    })

    .catch(err => {
      console.error(err);
    })

  // res.send({game: req.body.game, squares: req.body.squares, xIsNext: req.body.xIsNext})
  // res.send({game: 1, squares: Array(9).fill(null), xIsNext: true})
})

// why do we use router: using server w/ router attached, not singular example thing w/ app
// insert new information
router.put("/", function(req, res, next) {

  // make my new item
  let item = new ItemModel ({
    game:  1,
    squares: Array(9).fill(null),
    xIsNext: true,
  })

  //save the information
  item.save()
    .then(doc => {
      console.log(doc);
      res.send('save successful');
    })
    .catch(err => {
      console.error(err);
    })
})

// how to post/edit information
router.post('/', function(req, res, next) {
  console.log("req body" + req.body);
  console.log("doing a post");
  ItemModel
    .findOneAndUpdate (
      {
        game: 1,
      },
      {
        squares: req.body.squares,
        selected: req.body.selected,
      }
    )
    .catch(err => {
      console.error(err);
    })

    ItemModel
      .findOne({game: 1})
      .then(doc => {
        console.log("saved");
        console.log("sending: ", doc)
        res.send(doc);
      })

})


// export it all out
module.exports = router;

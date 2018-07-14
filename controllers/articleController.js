const Article = require("../models/article");


module.exports = {
  findAll: function(req, res) {
    Article
      .find({})
      .sort({ date: -1 })
   
      .then(dbModel => {
        console.log("hello findAll" + dbModel);
        res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
 
  create: function(req, res) {
    Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  
  remove: function(req, res) {
    Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

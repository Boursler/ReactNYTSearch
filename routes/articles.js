// const express = require("express");
const router = require("express").Router();
const articleController = require("../controllers/articleController");



// Matches with "/api/books"
router.route("/api/articles")
  .get(articleController.findAll)
  .post(articleController.create)
  .delete(articleController.remove);

router.route("/*").get(function(req, res){
  express.static('index');
})


module.exports = router;

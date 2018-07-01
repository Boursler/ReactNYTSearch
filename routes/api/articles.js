// const express = require("express");
const router = require("express").Router();
const articleController = require("../../controllers/articleController");
const path = require("path");


// Matches with "/api/books"
router.route("/")
  .get(articleController.findAll)
  .post(articleController.create)
  

router.route("/:id")
    .delete(articleController.remove);


module.exports = router;

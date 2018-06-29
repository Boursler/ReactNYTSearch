const router = require("express").Router();
const articleController = require("../controllers/articleController");
const path = require("path");


// Matches with "/api/books"
router.route("/api/articles")
  .get(articleController.findAll)
  .post(articleController.create)
  .delete(articleController.remove);




module.exports = router;

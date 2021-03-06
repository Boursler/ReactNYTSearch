const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: String, required: true },
  url: { type: String, required: true },
  pub_date: { type: Date, required: false}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;

import mongoose from 'mongoose';
// const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });
// require('dotenv').config();
// const client = new MongoClient(process.env.URI);
// mongoose.connect(process.env.URI, { useNewUrlParser: true });

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  size: Number,
  forks_count: Number,
  html_url: String
}); // can reduce amount of properties, but nice to have several options to filter search results by


// This creates our model from the above schema, using mongoose's model method
let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  // TODO: Your code here
  // This function should save a repo or repos to the MongoDB

  // check if the repo exists by trying to find it within the repo
  // only is the repo doesn't exists, add it to the DB
  // console.log('repo: ', repo);
  Repo.update(
    {
      id: repo.id
    },
    {
      $setOnInsert: repo
    },
    { upsert: true }
  )
    .then((res) => {
      // console.log("MongoDB response on save: ", res);
    })
    .catch((error) => {
      console.warn(error);
    })
}



module.exports.save = save;
module.exports.Repo = Repo;
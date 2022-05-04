import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/fetcher', { useNewUrlParser: true });

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

let Repo = mongoose.model('Repo', repoSchema);

let saveEntry = (repo) => {

  // console.log('repo: ', repo);
  Repo.update(
    { id: repo.id },
    { $setOnInsert: repo },
    { upsert: true }
  )
    .then((res) => {
      // console.log("MongoDB response on save: ", res);
    })
    .catch((error) => {
      console.warn(error);
    })
};


module.exports.saveEntry = saveEntry;
module.exports.Repo = Repo;
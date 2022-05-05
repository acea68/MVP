import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/mvp', { useNewUrlParser: true });

let ownersSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId, // creates unique id number
  owner: {
    type: String,
    unique: true,
    required: true
  },
  repoName: {
    type: String,
    required: true
  },
  toyProblems: [{
    name: String,
    html_url: String,
    notes: String,
    scores: String,
  }],
});

let OwnersModel = mongoose.model('ownersSchema', ownersSchema);

let saveEntry = (ownerData) => {
  OwnersModel.update(
    { owner: ownerData.owner },
    { $setOnInsert: ownerData },
    { upsert: true }
  )
    .then((response) => {
      console.log("MongoDB response on save: ", response);
    })
    .catch((error) => {
      console.error(error);
    })
};

let findOwner = (ownerName) => {
  OwnersModel.find({ owner: ownerName })
    .then((response) => {
      console.log("MongoDB response on findOwner: ", response);
      return response
    })
    .catch((error) => {
      console.error(error);
    })
};

export default { OwnersModel, saveEntry, findOwner };

/*
    { name: String },
    { html_url: String },
    { notes: String },
    { scores: String },
    */
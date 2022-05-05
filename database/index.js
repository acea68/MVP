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
    scores: String
  }],
});

let OwnersSchema = mongoose.model('ownersSchema', ownersSchema);

let saveEntry = (ownerData) => {
  // console.log('ownerData: ', ownerData);
  OwnersSchema.update(
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
  OwnersSchema.findOne({ owner: ownerName })
    .then((response) => {
      console.log("MongoDB response on findOneOwner: ", response);
      return response
    })
    .catch((error) => {
      console.error(error);
    })
};

export default { OwnersSchema, saveEntry, findOwner };

// module.exports.OwnersSchema = OwnersSchema;
// module.exports.saveEntry = saveEntry;
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-Parser';
import axios from 'axios';
import database from '../database/index.js';
// import OwnersSchema from '../database/index.js';
// import saveEntry from '../database/index.js';

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(urlencodedParser);
app.use(bodyParser.json());

/* ---------------
------ROUTES------
---------------- */
// upon submitting a search request for an owner and repo name (hardcoded to seach for demo-toy-probs repo)
  // repo must be public, repo admin privileges must be given to those accessing
app.post('/toyproblems', async (req, res) => {
  // retrieves array of problems (objects) based on owner and repo name
  let repoContents = await axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/contents`)
  // filter out non-toy problem files from contents request to GH API
  let toyProbsArray = [];
  repoContents.data.map(problem => {
    if (problem.name !== '.DS_Store') {
      toyProbsArray.push({ name: problem.name, html_url: problem.html_url })
    }
  })
  // retrieves all closed pull requests to get PR IDs in preparation for comments retrieval
  let repoPRs = await axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/pulls?state=closed`)

  let prComments = [];
  // retrieve all comments for every PR given the ID ("number")
  prComments = [
    ...prComments,
    ...await Promise.all(
      repoPRs.data.map(
        pr =>
          axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/issues/${pr.number}/comments`)
      ))
  ];
  // for every comment, extracts only toy problem name and score from comment body
  let scores = {};
  prComments.forEach(pr => {
    pr.data.forEach(comment => {
      if (comment.body.includes('Problem:')) {
        let prSummary = comment.body.split('\r\n')
        scores[prSummary[0].slice(9)] = prSummary[1].slice(9);
      }
    })
  })
  // adds scores to each toy problem object
  toyProbsArray.forEach(problem => {
    if (scores[problem.name]) {
      problem.scores = scores[problem.name];
      problem.notes = '';
    } else {
      problem.scores = 'Not attempted';
    }
  })
  // assemble the data
  let ownerData = {
    owner: req.body.owner,
    repoName: req.body.repoName,
    toyProblems: toyProbsArray
  };
  // save to db
  database.saveEntry(ownerData);
  // respond to client
  res.send(ownerData);
})

// upon page refresh, uses ComponentDidMount to render last serach query that is stored in db
app.get('/ownerdata/:ownername', (req, res) => {
  database.OwnersModel.findOne({ owner: req.params.ownername })
    .then((response) => {
      console.log("MongoDB response on findOneOwner: ", response);
      res.send(response)
    })
    .catch((error) => {
      console.error(error);
    })
});

app.post('/updatenote', (req, res) => {
  console.log('req.body, update comment: ', req.body)
  database.saveEntry()
})

var portNo = process.env.PORT || 3000
app.listen(portNo);
console.log(`Listening at http://localhost:${portNo}`);

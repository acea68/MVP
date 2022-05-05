import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-Parser';
import axios from 'axios';
import db from '../database/index.js';
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

app.post('/toyproblems', async (req, res) => {
  // retrieves array of problems (objects) based on owner and repo name
  let repoContents = await axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/contents`)
  // console.log('repoContents: ', repoContents.data);
  let toyProbsArray = [];
  repoContents.data.map(problem => {
    if (problem.name !== '.DS_Store') {
      toyProbsArray.push({ name: problem.name, html_url: problem.html_url })
    }
  })
  // console.log('toy problems array: ', toyProbsArray);
  // above works!-----------

  let repoPRs = await axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/pulls?state=closed`)
  // console.log('repoPRs.data: ', repoPRs.data);

  let prComments = [];
  prComments = [
    ...prComments,
    ...await Promise.all(
      repoPRs.data.map(
        pr =>
          axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/issues/${pr.number}/comments`)
      ))
  ];

  let scores = {};
  prComments.forEach(pr => {
    // console.log('pr.data: ', pr.data);
    pr.data.forEach(comment => {
      if (comment.body.includes('Problem:')) {
        let prSummary = comment.body.split('\r\n')
        scores[prSummary[0].slice(9)] = prSummary[1].slice(9);
      }
    })
  })
  // console.log('scores: ', scores);

  toyProbsArray.forEach(problem => {
    if (scores[problem.name]) {
      problem.scores = scores[problem.name];
    } else {
      problem.scores = '0 / 0';
    }
  })
  console.log('toyProbsArray: ', toyProbsArray);
  // assemble the data
  let ownerData = {
    owner: req.body.owner,
    repoName: req.body.repoName,
    toyProblems: toyProbsArray
  };
  db.saveEntry(ownerData);
  // console.log('ownerData: ', ownerData);
  res.send(ownerData);
})

app.get('/ownerdata/:ownername', async (req, res) => {
  console.log('req.params.ownername: ', req.params.ownername);
  // res.send(await db.findOwner(req.params.ownername));

  db.OwnersSchema.findOne({ owner: req.params.ownername })
    .then((response) => {
      console.log("MongoDB response on findOneOwner: ", response);
      res.json(response)
    })
    .catch((error) => {
      console.error(error);
    })

  // .then((response) => {
  //   res.send(response.data)
  // })
  // .catch(err => console.error(err));
})

var portNo = process.env.PORT || 3000
app.listen(portNo);
console.log(`Listening at http://localhost:${portNo}`);

/*
app.post('/toyProblems', (req, res) => {
  // retrieves array of problems (objects) based on owner and repo name
  axios.get(`https://api.github.com/repos/${req.body.owner}/${req.body.repoName}/contents`)
    .then(response => {

      // console.log(response.data);
      let toyProbsArray = [];
      response.data.map(problem => {
        if (problem.name !== '.DS_Store') {
          toyProbsArray.push({ name: problem.name, html_url: problem.html_url })
        }
      })
      // console.log('toy problems array: ', toyProbsArray);
      return toyProbsArray;
    })
    .then(toyProbsArray => {
      // assemble the data
      let ownerData = {
        owner: req.body.owner,
        repoName: req.body.repoName,
        toyProblems: toyProbsArray
      };
      db.saveEntry(ownerData);
      console.log('ownerData: ', ownerData);
      res.send(ownerData);
      // return ownerData;
    })
    // .then((ownerData) => {
    //   db.findOwner(req.body.owner, (err, data) => {
    //     if (err) {
    //       console.error(err)
    //     } else {
    //       res.send(data);
    //     }
    //   })
    //   // res.send(ownerData)
    // })
    .catch(err => console.error(err));
})
*/
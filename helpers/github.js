import 'dotenv/config';
import axios from 'axios';

let getReposByUsername = (githubHandle) => {
  var url = `https://api.github.com/users/${githubHandle}/repos`;
  let options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };
  return axios.get(url, options);
};

export default getReposByUsername
// module.exports.getReposByUsername = getReposByUsername;

/*
// REPOS: OWNER OF (L:60, public & priv, I only own 3)
curl https://api.github.com/search/repositories?q=user:acea68
curl -i -u acea68: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 https://api.github.com/search/repositories?q=user:acea68

// (some more) USER PROFILE DETAILS (L:5000)
curl -i -u acea68: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 https://api.github.com/users/acea68

// USER PROFILE DETAILS (L:5000)
curl -i -u acea68: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 https://api.github.com/user

// USER REPO LIST (L:5000, need HackRx permission to read repos forked from them)
// https://stackoverflow.com/questions/30239720/github-api-private-or-forked-repositories-not-listing-nor-comparing
curl -i -u acea68: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 https://api.github.com/users/acea68/repos

// (from Stackoverflow) OWNER OF (L:30, public & priv)
curl -i -u acea68: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 https://api.github.com/search/repositories?q=user:acea68

// GET A REPO
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/acea68/Taskmantrack (public/own - works)
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/acea68/rfc2202-toy-problems (DNE, private/forked)
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/acea68/hackRx_notes (DNE, private)
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/acea68/Cheat-Sheet-Docker (public/forked - works)

// GET ALL PROBLEMS (CONTENTS) FROM REPO
curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/repos/OWNER/REPO/contents/PATH


  */
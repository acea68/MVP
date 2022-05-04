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

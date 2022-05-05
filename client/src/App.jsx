import React from 'react';
import axios from 'axios';
import Search from './components/Search.jsx';
import ToyProblemList from './components/ToyProblemList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: '',
      repoName: '',
      toyProblems: [],
      totalAttempted: 0,
      totalPassing: 0,
    }
    this.searchGithubHandle = this.searchGithubHandle.bind(this);
  }

  searchGithubHandle(ownerAndRepo) {
    this.setState({
      owner: ownerAndRepo.owner,
      repoName: ownerAndRepo.repoName
    });
    axios.post('/toyproblems', ownerAndRepo)
      .then(response => {
        this.setState({ toyProblems: response.data.toyProblems })
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    axios.get('/ownerdata/acea68')
      .then(response => {
        if (response.data && response.data.toyProblems.length > 0) {
          this.setState({
            owner: 'acea68',
            repoName: 'demo-rfc2202-toy-problems',
            toyProblems: response.data.toyProblems
          })
        } else {
          console.log('No data available for this user.')
        }
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className='taskman'>
        <h1>Taskman Tracker</h1>
        <Search searchHandle={this.searchGithubHandle} />
        {/* <Totals
          totalAttempted={this.state.totalAttempted}
          totalPassing={this.state.totalPassing}
          toyProblems={this.state.toyProblems}
        /> */}
        <ToyProblemList
          toyProblems={this.state.toyProblems}
          owner={this.state.owner}
        />
      </div>
    )
  };
};

export default App;

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
      toyProblems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6],
      totalAttempted: 0,
      totalPassing: 0,
    }
  }

  searchGithubHandle(ownerAndRepo) {
    this.setState({
      owner: ownerAndRepo.owner,
      repoName: ownerAndRepo.repoName
    });
    axios.post('/toyProblems', ownerAndRepo)
      .then(response => {
        console.log('response: ', response);
        this.setState({ toyProblems: response })
      })
      .catch(error => {
        console.error(error);
      })
  }

  componentDidMount() {
    // this.setState({})
  }

  render() {
    return (
      <div>
        <h1>Taskman Tracker</h1>
        <Search searchHandle={this.searchGithubHandle} />
        {/* <Totals
          totalAttempted={this.state.totalAttempted}
          totalPassing={this.state.totalPassing}
          toyProblems={this.state.toyProblems}
        /> */}
        <ToyProblemList toyProblems={this.state.toyProblems} />
      </div>
    )
  };
};

export default App;

// toyProblems: [1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6],
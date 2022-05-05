import React from 'react';
import axios from 'axios';

class ToyProblem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({ notes: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    // this.props.searchHandle(this.state.owner);
    axios.post('/updateNote', {name: this.props.problem.name, notes: this.state.notes})
    .then(() => {
      this.setState({ notes: response.data })
    })
    .catch(error => console.error(error));
  }

  // componentDidMount() {
  //   this.setState({})
  // }

  render() {
    // console.log('toy problem return:', this.props)
    return (
      <div className='toyRow'>
        <a href={this.props.problem.html_url}>{this.props.problem.name}</a>
        <div>{this.props.problem.scores}</div>
        {/* <div># Of Attempts</div> */}
        <div>
          <form className='notesForm' onSubmit={this.onSubmitHandler}>
            <textarea value={this.state.notes} onChange={this.onChangeHandler} />
            <input type="submit" value="Save/Update" />
          </form>
        </div>
      </div>
    )
  }
};

export default ToyProblem;
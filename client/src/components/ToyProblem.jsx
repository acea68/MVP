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
    console.log('this.props, toyProb:', this.props)
    axios.post('/updatenote', {
      owner: this.props.owner,
      name: this.props.problem.name,
      notes: this.state.notes
    })
    .then(() => {
      this.setState({ notes: response.data })
    })
    .catch(error => console.error(error));
  }

  // componentDidMount() {
  //   this.setState({})
  // }

  render() {
    return (
      <div className='toyRow'>
        <a className='toyName' href={this.props.problem.html_url}>{this.props.problem.name}</a>
        <div className='scoreNum'>{this.props.problem.scores}</div>
        {/* <div># Of Attempts</div> */}
        <div className='formCol'>
          <form className='notesForm' onSubmit={this.onSubmitHandler}>
            <textarea value={this.state.notes} onChange={this.onChangeHandler} />
            <input className="btn btn-primary" type="submit" value="Save/Update" />
          </form>
        </div>
      </div>
    )
  }
};

export default ToyProblem;
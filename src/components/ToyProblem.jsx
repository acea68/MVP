import React from 'react';

class ToyProblem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandler(event) {
    this.setState({ query: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.searchHandle(this.state.owner);
    this.setState({ owner: '' });
  }

  render() {
    // console.log('toy problem return:', this.props)
    return (
      <div className='toyRow'>
        <div>Toy Problem: {this.props.problem}</div>
        <div>Score</div>
        <div># Of Attempts</div>
        <div>
          <form className='notesForm' onSubmit={this.onSubmitHandler}>
            <textarea value={this.state.owner} onChange={this.onChangeHandler} />
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    )
  }
};

export default ToyProblem;
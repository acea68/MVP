import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owner: 'acea68',
      repoName:'demo-rfc2202-toy-problems'
    };

    this.onChangeHandlerOwner = this.onChangeHandlerOwner.bind(this);
    this.onChangeHandlerRepoName = this.onChangeHandlerRepoName.bind(this);

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onChangeHandlerOwner(event) {
    this.setState({ owner: event.target.value });
  }

  onChangeHandlerRepoName(event) {
    this.setState({ repoName: event.target.value });
  }

  onSubmitHandler(event) {
    event.preventDefault();
    this.props.searchHandle(this.state);
    // this.setState({ owner: '' });
  }

  render() {
    return (
      <div>
        <h3>Search by Github Handle & Repo</h3>
        <form onSubmit={this.onSubmitHandler}>
          <input value={this.state.owner} onChange={this.onChangeHandlerOwner} />
          <input value={this.state.repoName} onChange={this.onChangeHandlerRepoName} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
};

export default Search;
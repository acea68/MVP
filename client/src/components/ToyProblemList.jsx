import React from 'react';
import ToyProblem from './ToyProblem.jsx';
import { v4 as uuidv4 } from 'uuid';

const ToyProblemList = (props) => {
  return (
    <div className='toyProbList'>
      <h2>List of Toy Problems</h2>
      <h6 className="lead" >{props.toyProblems.length > 35 ? 'Welcome to Hack Rx Senior Phase!' : 'Let\'s go do some learning in Junior Phase!'}</h6>
      <div className="toyList">{props.toyProblems.map( problem =>  {
        return (
        <ToyProblem
        problem={problem}
        owner={props.owner}
        key={uuidv4()} />
      )})
      }</div>
    </div>
  )
};

export default ToyProblemList;
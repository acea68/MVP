import React from 'react';
import ToyProblem from './ToyProblem.jsx';
import { v4 as uuidv4 } from 'uuid';

const ToyProblemList = (props) => {
  // console.log('here')
  return (
    <div>
      <h2>List of Toy Problems</h2>
      <h6>{props.toyProblems.length > 35 ? 'Welcome to Hack Rx Senior Phase!' : 'Let go do some learning in Junior Phase!'}</h6>
      <div>{props.toyProblems.map( problem =>  {
        // console.log('problem: ', problem)
        return (
        <ToyProblem problem={problem} key={uuidv4()} />
      )})
      }</div>
    </div>
  )
};

export default ToyProblemList;
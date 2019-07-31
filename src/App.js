import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';



class Counter extends Component {
  constructor( props) {
    super( props );
    this.state = {
      counterNum: 0
    }
  }

  handleAdd() {
    this.props.dispatch({ type: 'ADD'});
  }

  handleSub() {
    this.props.dispatch({ type: 'SUB'});
  }

  render() {
    return (
      <div className="counter">
        <h1> { this.props.counterNum ?  this.props.counterNum : this.state.counterNum} </h1>
        <button onClick={this.handleAdd.bind(this)}>增加</button>
        <button onClick={this.handleSub.bind(this)}>减少</button>
      </div>
    );
  }
}
const mapStateToProps = ( state ) => {
  return ({
    counterNum: state.handleCounter
  });
}

export default connect( mapStateToProps )(Counter);

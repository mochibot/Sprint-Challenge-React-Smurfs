import React, { Component } from 'react';
import axios from 'axios'
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import Smurf from './components/Smurf';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(response => {
        console.log('smurf data', response)
        this.setState({
          smurfs: response.data
        })
      })
      .catch(error => {
        console.log('error getting smurf data', error)
      })
  }

  addSmurf = (event, smurf) => {
    event.preventDefault();
    axios.post('http://localhost:3333/smurfs', smurf)
      .then(response => {
        console.log('data with new smurf added', response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(error => {
        console.log('error adding smurf', error)
      })
  }

  render() {
    return (
      <div className="App">
        <header className='App-navBar'>
          <NavLink exact to='/'>Back to home</NavLink>
          <NavLink exact to='/smurf-form'>Add a smurf</NavLink>
        </header>
        <Route
          exact
          path='/'
          render={(props) => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
            />
          )} />
        <Route 
          path='/smurf-form' 
          render={(props) => (
            <SmurfForm 
              {...props}
              addSmurf={this.addSmurf}
            />
        )} />
      </div>
    );
  }
}

export default App;

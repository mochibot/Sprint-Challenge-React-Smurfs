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
      activeSmurf: null
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

  setUpdateForm = (event, smurf) => {
    event.preventDefault();
    this.setState({
      activeSmurf: smurf
    })
    this.props.history.push('/smurf-form');
  }

  editSmurf = (event, smurf) => {
    event.preventDefault();
    axios.put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
      .then(response => {
        console.log('data with smurf edited', response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(error => {
        console.log('error editing smurf', error)
      })
    this.setState({
      activeSmurf: null
    })
  }

  deleteSmurf = (event, id) => {
    event.preventDefault();
    axios.delete(`http://localhost:3333/smurfs/${id}`)
      .then(response => {
        console.log('data with smurf deleted', response);
        this.setState({
          smurfs: response.data
        })
      })
      .catch(error => {
        console.log('error deleting smurf', error)
      })
  }

  //reset to prevent current activesmurf from populating form in case the user from clicking on back to home without editing
  resetActive = () => {
    this.setState({
      activeSmurf: null
    })
  }

  render() {
    return (
      <div className="App">
        <header className='App-navBar'>
          <NavLink exact to='/'><button>Home</button></NavLink>
          <NavLink exact to='/smurf-form'><button onClick={() => this.resetActive()}>Add smurf</button></NavLink>
        </header>
        <Route
          exact
          path='/'
          render={(props) => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf}
              setUpdateForm={this.setUpdateForm}
            />
          )} />
        <Route 
          path='/smurf-form' 
          render={(props) => (
            <SmurfForm 
              {...props}
              addSmurf={this.addSmurf}
              activeSmurf={this.state.activeSmurf}
              editSmurf={this.editSmurf}
            />
        )} />
      </div>
    );
  }
}

export default App;

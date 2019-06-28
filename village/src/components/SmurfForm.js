import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //modified initial code to make input an object
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    };
  }

  componentDidMount() {
    if(this.props.activeSmurf) {
      this.setState({
        smurf: this.props.activeSmurf
      })
    }
  }

  /* commenting out initial code as the form is now moved to a separate page and the .post() method was moved to App.js (where the data is passed down)
  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }
  */

  submitHandler = (event) => {
    event.preventDefault();
    if (this.props.activeSmurf) {
      this.props.editSmurf(event, this.state.smurf);
    } else {
      this.props.addSmurf(event, this.state.smurf);
    }
    this.setState({
      smurf: {
        name: '',
        age: '',
        height: ''
      }
    })
  }

  handleInputChange = e => {
    //this.setState({ [e.target.name]: e.target.value });
    e.persist();
    let value = e.target.value;
    //change age to int
    if (e.target.name === 'age') {
      value = parseInt(value, 10);
    }
    this.setState(prevState => ({
      smurf: {
        ...prevState.smurf,
        [e.target.name]: value
      }
    }))
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.submitHandler}>
          <input
            type='text'
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.smurf.name}
            name="name"
          />
          <input
            type='number'
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.smurf.age}
            name="age"
          />
          <input
            type='text'
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.smurf.height}
            name="height"
          />
          <button type="submit">{this.props.activeSmurf ? 'Edit' : 'Add'}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;

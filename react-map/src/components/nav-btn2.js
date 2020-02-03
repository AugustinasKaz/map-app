import React from 'react';
import '../static/nav-style.css'
import List from './buttonsComponents/btn2-list'
import Autocomplete from './buttonsComponents/autocomplete';
import axios from 'axios'

class Favorites_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem('user'),
      userInput: " ",
      cityInput: " ",
      dropdown_open: false,
      loadMessage: "Username will be saved in localStorage",
      UserCities: {}
    };
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  async componentDidMount(){
    if (this.state.user !== null) {
      const promise = await axios.post('http://localhost:4000/api/getUsersCities', { user: this.state.user });
      const status = promise.status
      if (status === 200) {
          this.setState({UserCities: promise.data})
      }
    }
  }

    async addUserToDatabase() {
      this.setState({ loadMessage: "Loading" })
      const promise = await axios.post('http://localhost:4000/api/addUser', { user: this.state.userInput });
      const status = promise.status
      if (status === 200) {
        let databaseRes = promise.data;
        if (databaseRes.name === 'error') {
          this.setState({ loadMessage: databaseRes.detail })
        }
        else {
          this.setState({ user: this.state.userInput });
          localStorage.setItem('user', this.state.userInput);
          this.dropdownHandle();
        }
      }
      else {
        this.setState({ loadMessage: "Failed to connect" })
      }
    }


    handleUserInput = (e) => {
      this.setState({ userInput: e.target.value })
    }
    handleCityInput = (e) => {
      this.setState({ cityInput: e.target.value })
    }

    dropdownHandle = () => {
      this.setState({ dropdown_open: !this.state.dropdown_open })
    }

    submitValidation = (e) => {
      if (e.key === 'Enter') {
        if (this.state.userInput.length > 3) {
          this.addUserToDatabase()
        }
      }
    }



    render() {
      //localStorage.removeItem("user");
      if (this.state.user === null) {
        if (this.state.dropdown_open === true) {
          return (
            <div className="dropdown">
              <button style={{ width: '214%' }} onClick={this.dropdownHandle} className="dropbtn">Favorite cities</button>
              <div style={{ width: '199%' }} className="dropdown-content">
                <h4>Create local user</h4>
                <input onChange={this.handleUserInput} onKeyPress={this.submitValidation} value={this.state.userInput} className="user-input"></input>
                <span style={{ fontSize: '12px' }}>{this.state.loadMessage}</span>
              </div>
            </div>
          )
        }
        else {
          return (
            <div className="dropdown">
              <button style={{ width: '214%' }} onClick={this.dropdownHandle} className="dropbtn">Favorite cities</button>
            </div>
          )
        }
      }
      else {
        if (this.state.dropdown_open === true) {
          return (
            <div className="dropdown">
              <button style={{ width: '214%' }} onClick={this.dropdownHandle} className="dropbtn">Favorite cities</button>
              <div style={{ width: '199%' }} className="dropdown-content">
                <h5>User: {this.state.user}</h5>
                <Autocomplete user={this.state.user} />
                <List cities={this.state.UserCities} />
              </div>
            </div>
          )
        }
        else {
          return (
            <div className="dropdown">
              <button style={{ width: '214%' }} onClick={this.dropdownHandle} className="dropbtn">Favorite cities</button>
            </div>
          )
        }
      }
    }
  }

  export default Favorites_list;


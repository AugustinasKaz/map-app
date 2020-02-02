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
      dropdown_open: false
    };
    this.addUserToDatabase = this.addUserToDatabase.bind(this);
  }

  async addUserToDatabase(){
    axios.post()
  }
  handleUserInput = (e) => {
    this.setState({ userInput: e.target.value })
  }
  handleCityInput = (e) => {
    this.setState({ cityInput: e.target.value })
  }

  dropdownHandle = () =>{
    this.setState({ dropdown_open: !this.state.dropdown_open })
  }

  submitValidation = (e) => {
    if (e.key === 'Enter') {
      if (this.state.userInput.length > 3) {
        this.setState({ user: this.state.userInput })
        localStorage.setItem("user", this.state.userInput);
        this.addUserToDatabase()
      }
    }
  }



  render() {
    if (this.state.user === null) {
      return (
        <div className="dropdown">
          <button style={{ width: '214%' }} className="dropbtn">Favorite cities</button>
          <div style={{ width: '199%' }} className="dropdown-content">
            <h4>Create local user</h4>
            <input onChange={this.handleUserInput} onKeyPress={this.submitValidation} value={this.state.userInput} className="user-input"></input>
            <span style={{ fontSize: '12px' }}>Username will be saved in localStorage</span>
          </div>
        </div>
      )
    }
    else {
      if(this.state.dropdown_open === true){
      return (
        <div className="dropdown">
          <button style={{ width: '214%' }} onClick={this.dropdownHandle} className="dropbtn">Favorite cities</button>
          <div style={{ width: '199%'}} className="dropdown-content">
            <h5>User: {this.state.user}</h5>
            <span style={{ fontSize: '12px' }}>Add new city</span>
            <Autocomplete/>
            <List user={this.state.user} />
          </div>
        </div>
      )
      }
      else{
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


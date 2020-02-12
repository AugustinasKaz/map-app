import React from 'react';
import '../static/nav-style.css'
import Autocomplete from './buttonsComponents/autocomplete';
import { AddNewUser } from './APIfunction'

class Favorites_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: localStorage.getItem('user'),
      userInput: " ",
      dropdown_open: false,
      loadMessage: "Username will be saved in localStorage",
    };
    this.submitValidation = this.submitValidation.bind(this); 
  }

  handleUserInput = (e) => {
    this.setState({ userInput: e.target.value })
  }
  
  dropdownHandle = () => {
    this.setState({ dropdown_open: !this.state.dropdown_open })
  }

  async submitValidation(e) {
    if (e.key === 'Enter') {

      if (this.state.userInput.length > 3) {
        this.setState({ loadMessage: "Loading" })
        let response = await AddNewUser(this.state.userInput);

        if (response.status === 'success') {
          this.setState({ user: this.state.userInput });
          localStorage.setItem('user', this.state.userInput);
          this.dropdownHandle();
        }
        else
          this.setState({ loadMessage: response.detail})
      }
    }
  }



  render() {
    localStorage.removeItem("user");
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
              <Autocomplete user={this.state.user}/>
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


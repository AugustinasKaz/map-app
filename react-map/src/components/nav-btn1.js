import React from 'react';
import '../static/nav-style.css'
import List from './buttonsComponents/btn1-list'

class Button1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown_open: false
    };
  }
  dropdownHandle = () =>{
    this.setState({ dropdown_open: !this.state.dropdown_open })
  }
  render() {
      if(this.state.dropdown_open === true){
      return (
        <div className="dropdown">
            <button style={{width:'286%'}} onClick={this.dropdownHandle} className="dropbtn">Cities list</button>
            <List/>
          </div>
      )
      }
      else{
        return (
          <div className="dropdown">
            <button style={{width:'286%'}} onClick={this.dropdownHandle} className="dropbtn">Cities list</button>
          </div>
        )
      }
    }
}
export default Button1;




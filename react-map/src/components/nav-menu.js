import React from 'react';
import '../static/navigation_map.css'
import arrows from '../static/media/arrows.png';
import Button1 from './nav-btn1'
import Button2 from './nav-btn2'

class Nav_menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: true
      
    };
    this.btn_test = this.btn_test.bind(this);
    
  }
  btn_test(){
    this.props.bars_handler();
  }

  render() {
    return (
        <div className="over1">
            <div className="header">
              <img alt="img-logo" onClick={this.props.bars_handler} className="img_arrows" src={arrows}/>
              <h1 className="header_text">Menu</h1>
            </div>
            <div className="menu-display">
              <ul className="u-list">
              <li><Button1/></li>
              <br/>
              <li><Button2/></li>
            </ul>
            </div>
        </div>
    )
  }
}

export default Nav_menu;
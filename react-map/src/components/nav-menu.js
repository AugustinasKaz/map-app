import React from 'react';
import '../static/navigation_map.css'
import Button1 from './nav-btn1'
import Button2 from './nav-btn2'
import Close from './icons/nav-menu-icon'

class Nav_menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: true

    };
  }

  render() {
    return (
      <div className="over1">
        <div className="wrapper" >
          <div onClick={this.props.bars_handler}>
            <Close />
          </div>
          <h1 className="header-text">MENU</h1>
        </div>
        <div className="menu-display">
          <ul className="u-list">
            <li><Button1 /></li>
            <br />
            <li><Button2 /></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Nav_menu;
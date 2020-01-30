import React from 'react';
import '../static/navigation_map.css'
import arrows from '../static/media/arrows.png';
import City_list from './nav-city_list'

class Navigation_bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: true
      
    };
    this.btn_test = this.btn_test.bind(this);
    
  }
  btn_test(){
    this.props.bars_handler();
    this.props.coors_handler(177, 45)
  }

  render() {
    return (
        <div className="over1">
            <div className="header">
              <img onClick={this.props.bars_handler} className="img_arrows" src={arrows}/>
              <h1 className="header_text">Menu</h1>
            </div>
            <div className="menu-display">
              <ul className="u-list">
              <li><City_list/></li>
            </ul>
            </div>
        </div>
    )
  }
}

export default Navigation_bar;
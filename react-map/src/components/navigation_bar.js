import React from 'react';
import '../static/navigation_map.css'
import arrows from '../static/media/arrows.png';

class Navigation_bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: true
      
    };
    
  }
  
  render() {
    return (
        <div className="over1">
            <div className="header">
              <img onClick={this.props.handler} className="img_arrows" src={arrows}/>
            </div>
        </div>
    )
  }
}

export default Navigation_bar;
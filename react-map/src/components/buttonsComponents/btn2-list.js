import React from 'react';
import '../../static/nav-style.css'

class Favorites_list extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }
  render() {
    return (
      <ul>
          <li>City1</li>
          <li>City2</li>
          <li>City3</li>
      </ul>
    )
   }
}

export default Favorites_list;


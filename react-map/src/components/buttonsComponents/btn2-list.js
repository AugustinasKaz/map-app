import React from 'react';
import '../../static/nav-style.css'
import CitiesContext from './UserContext'

function Favorites_list(){
  const UsersCities = useContext(CitiesContext)
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


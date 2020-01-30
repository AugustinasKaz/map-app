import React from 'react';
import CitiesContext from './context'
import '../static/nav-style.css'

const City_list = () => {
    return(
    <CitiesContext.Consumer>
        {value => (
        <div class="dropdown">
        <button class="dropbtn">Cities list</button>
        <div class="dropdown-content">
            {value.map((el) =>
          <li>{el.city_name}</li>
            )}
        </div>
      </div>
        )}
        
  
        
    </CitiesContext.Consumer>
    )}

export default City_list;
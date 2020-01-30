import React, { useContext } from 'react';
import CitiesContext from './context'
import '../static/nav-style.css'

const City_list = () => {
  const data = useContext(CitiesContext);

  return (
    <CitiesContext.Consumer>
      {({ cities, setCity }) => (
        <div className="dropdown">
          <button className="dropbtn">Cities list</button>
          <div className="dropdown-content">
            {cities.map((el) =>
              <li onClick={() => setCity(el.coordinates)} key={el}>{el.city_name}</li>
            )}
          </div>
        </div>
      )}



    </CitiesContext.Consumer>
  )
}

export default City_list;


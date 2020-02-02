import React from 'react';
import CitiesContext from '../context'
import '../../static/nav-style.css'

const List = () => {
  return (
    <CitiesContext.Consumer>
      {({ cities, setCity }) => (
          <div style={{width:'266%',overflow: 'scroll'}} className="dropdown-content">
            {cities.map((el) =>
              <li onClick={() => setCity(el.coordinates)} key={el.city_id}>{el.city_name}</li>
            )}
          </div>
      )}
    </CitiesContext.Consumer>
  )
}

export default List;


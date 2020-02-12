import React, {useContext} from 'react';
import '../../static/nav-style.css'
import CitiesContext from '../context'

function Favorites_list(props) {
  const data = useContext(CitiesContext)
  const userCities = props.userCities
  var filtered = data.cities.filter(
    function (e) {
      return this.indexOf(e.city_name) >= 0;
    },
    userCities
  );
  
  return (
    <CitiesContext.Consumer>
      {({ cities, setCity }) => (
        <ul className="favCityList">
          {filtered.map((el) =>
            <li onClick={() => setCity(el.coordinates)} key={el.city_id}>{el.city_name}</li>
          )}
        </ul>
      )}
    </CitiesContext.Consumer>
  )
}


export default Favorites_list;


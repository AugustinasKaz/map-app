import React, {useContext} from 'react';
import '../../static/nav-style.css'
import ClearIcon from '../icons/nav-btn2-icon';
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
            <li key={el.city_id} className="wrapper">
              <div className="col1">
              <label className="favListName" onClick={() => setCity(el.coordinates)}>{el.city_name}</label>
              </div>
              <div className="col2">
              <ClearIcon data={el.city_name} user={props.user}/>
              </div>
            </li>
          )}
        </ul>
      )}
    </CitiesContext.Consumer>
  )
}


export default Favorites_list;


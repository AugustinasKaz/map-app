import React, { useContext, useState, useEffect } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CitiesContext from '../context'
import '../../static/nav-style.css'
import { AddNewCity, GetUsersCities } from '../APIfunction'
import List from './btn2-list'

export default function Autocomplete(props) {
  const cities = useContext(CitiesContext);
  let [input, setInput] = useState(" ");
  let [error, setError] = useState("Add new city");
  let [Ucities, setCities] = useState({});

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: cities.cities,
    getOptionLabel: option => option.city_name,
  });

  async function fetchCities(){
  let response = await GetUsersCities(props.user);
      if(response.status === 'success'){
        if(response.detail.favorite_cities !== null || response.detail.favorite_cities !== undefined)
          setCities(Ucities = response.detail.favorite_cities)
      }
  }

  useEffect(() => {
    fetchCities();
  }, [])

  async function addCity(){
    setError(error = `Adding ${input} to the list`)
    let response = await AddNewCity(props.user, input)
    if (response.status === 'success') {
      setError(error = 'Add new city')
      fetchCities();
    }
    else
      setError(error = response.detail)
  }

  function validate(e) {
    setInput(input = e.target.value)
    if (e.key === 'Enter') {
      var city_exists = cities.cities.filter(function (elem) {
        return elem.city_name === input
      })
      if(city_exists.length === 1){
        addCity();
      }
      else
        setError(error = "city does not exist")
    }
  }


  return (
    <div>
      <div {...getRootProps()}>
      <span style={{ fontSize: '12px' }}>{error}</span>
        <input className="user-input" value={input} onKeyPress={validate} {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <div className="dropdown-content" style={{ overflow: 'scroll' }} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.city_name}</li>
          ))}
        </div>
      ) : null}
       {Object.entries(Ucities).length === 0 && Ucities.constructor === Object ? <h4>Loading...</h4> : <List userCities={Ucities} user={props.user}/>}
    </div>
  );
}
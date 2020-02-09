import React, { useContext, useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CitiesContext from '../context'
import '../../static/nav-style.css'
import { AddNewCity } from '../APIfunction'

export default function Autocomplete(props) {
  const cities = useContext(CitiesContext);
  let [input, setInput] = useState(" ");
  let [error, setError] = useState("Add new city");
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

  async function addCity(){
    setError(error = `Adding ${input} to the list`)
    let response = await AddNewCity(props.user, input)
    if (response.status === 'success') {
      setError(error = 'Add new city')
      setInput(input = " ")
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
    </div>
  );
}

import React, { useContext }  from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CitiesContext from '../context'
import '../../static/nav-style.css'

export default function Autocomplete() {
  const cities = useContext(CitiesContext)
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

  return (
    <div>
      <div {...getRootProps()}>
        <input className="user-input" {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <div className="dropdown-content" style={{overflow: 'scroll'}} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>{option.city_name}</li>
          ))}
       </div>
      ) : null}
    </div>
  );
}
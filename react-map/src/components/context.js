import React from 'react'
const CitiesContext = React.createContext({
    cities: [1,2,3,4],
    setCity: () => {},
});

export default CitiesContext;
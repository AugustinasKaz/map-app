import React from 'react';
import Main_map from './components/main'
import Tmp from './components/loading_error'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://map-app2.herokuapp.com/v1/graphql'
});

const CITIES_QUERY = gql`
query CitiesQuery{
  cities{
    city_id
    city_name
    coordinates
  }
}
`;

function App(){
    return (
      <ApolloProvider client={client}>
        <div>
          <Query query={CITIES_QUERY}>
            {({ loading, error, data}) => {
              if (error) return <Tmp  info={error}/>;
              if (loading) return <Tmp info='Loading'/>;
              return <Main_map cities={data.cities}/>;
            }}
          </Query>
         
        </div>
      </ApolloProvider>
    );
}

export default App;
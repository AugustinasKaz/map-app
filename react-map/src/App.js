import React from 'react';
import Main_map from './components/main_map'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <Query query={CITIES_QUERY}>
            {({ loading, error, data }) => {
              if (error) console.log("ERROR", error);
              return <Main_map cities={data}/>;
            }}
          </Query>
         
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
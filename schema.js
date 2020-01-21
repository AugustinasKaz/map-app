const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnum
} = require('graphql');
const { Client } = require('pg');



const DATABASE_URL = 'postgres://xbhkkqzvnqzwjm:510cae2af7209914c02c1e160bb277ea0ca247ed5bacb8248d226944450c782a@ec2-54-174-229-152.compute-1.amazonaws.com:5432/d90g9ggeg795ki';
const cities = []

function fetch_database(){
    const client = new Client({
        connectionString: DATABASE_URL,
        ssl: true,
    });
    client.connect();
    client.query('SELECT*FROM cities;', (err, response) => {
        if (err)
            throw err;
        else {
            for (let row of response.rows) {
                cities.push(row);
            }
            client.end();
        }
    });
}


const CityType = new GraphQLObjectType({
    name:'City',
    fields:() => ({
        city_id: {type:GraphQLInt},
        city_name: {type: GraphQLString},
        coordinates: {type: new GraphQLList(GraphQLString)}
    })
});

const RootQuery= new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        cities:{
            type: new GraphQLList(CityType),
            resolve(parentValue, args){
                fetch_database();
                return cities;
            }
        }   
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
});
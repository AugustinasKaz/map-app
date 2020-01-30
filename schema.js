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
const axios = require('axios');
const cities = []

/*async function add_articles(city) {
    var tmp_arr = []
    const promise = await axios.get(`https://newsapi.org/v2/everything?q=${city.city_name}&apiKey=81ed2033ac864fa5bc932f088b9bbc44`);
    const status = promise.status;
    if (status === 200) {
        for (var i = 0; i < 3; i++) {
            var tmp_obj = { title: promise.data.articles[i].title, url: promise.data.articles[0].url }
            tmp_arr.push(tmp_obj)
        }
        Object.assign(city, { articles: tmp_arr });
    }
    else {
        console.log(status)
    }
}*/


const ArticleType = new GraphQLObjectType({
    name: 'Article',
    fields: () => ({
        title: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        cities: {
            type: new GraphQLList(ArticleType),
            resolve(parentValue, args) {
                axios.post('https://map-app2.herokuapp.com//v1alpha1/graphql').then(response => {
                    console.log(response.data);
                })
              
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery,
});
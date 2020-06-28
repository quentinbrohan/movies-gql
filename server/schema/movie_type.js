const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const ReviewType = require('./review_type');
const Movie = mongoose.model('movie');

const MovieType = new GraphQLObjectType({
  name:  'MovieType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve(parentValue) {
        return Movie.findReviews(parentValue.id);
      }
    }
  })
});

module.exports = MovieType;

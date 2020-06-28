const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const MovieType = require('./movie_type');
const ReviewType = require('./review_type');
const Review = mongoose.model('review');
const Movie = mongoose.model('movie');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    // Récupérer tous les films
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.find({});
      }
    },
    // Retrouver un film par son id
    movie: {
      type: MovieType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Movie.findById(id);
      }
    },
    review: {
      // Retrouver une review par son id
      type: ReviewType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Review.findById(id);
      }
    }
  })
});

module.exports = RootQuery;

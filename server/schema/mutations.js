const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require('mongoose');
const Movie = mongoose.model('movie');
const Review = mongoose.model('review');
const MovieType = require('./movie_type');
const ReviewType = require('./review_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Ajouter un film
    addMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString }
      },
      resolve(parentValue, { title }) {
        return (new Movie({ title })).save().then((response) => {
          console.log(response);
          
          return response;
        })
        .catch((error) => {
          return new Error('Le titre doit être unique !');
        })
      }
    },
    addReviewToMovie: {
      // Ajouter une review au film ayant l'id movieId
      type: MovieType,
      args: {
        content: { type: GraphQLString },
        movieId: { type: GraphQLID }
      },
      resolve(parentValue, {movieId,content}) {

        return Movie.addReview(movieId, content);
      }
    },
    likeReview: {
      // Liker une review par son id
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Review.like(id);
      }
    },
    deleteMovie: {
      // Supprimer un film par son id
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Movie.remove({ _id: id });
      }
    }
  }
});

module.exports = mutation;

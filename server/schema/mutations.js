const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Movie = mongoose.model("movie");
const Review = mongoose.model("review");
const MovieType = require("./movie_type");
const ReviewType = require("./review_type");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        title: { type: GraphQLString },
      },
      resolve(parentValue, { title }) {
        return new Movie({ title })
          .save()
          .then((response) => {
            return response;
          })
          .catch((error) => {
            return new Error("Ce film est déjà présent !");
          });
      },
    },
    addReviewToMovie: {
      type: MovieType,
      args: {
        content: { type: GraphQLString },
        movieId: { type: GraphQLID },
      },
      resolve(parentValue, { movieId, content }) {
        return Movie.addReview(movieId, content);
      },
    },
    saveReview: {
      type: ReviewType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Review.like(id);
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Movie.remove({ _id: id });
      },
    },
  },
});

module.exports = mutation;

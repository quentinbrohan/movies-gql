const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const Review = mongoose.model('review');

const ReviewType = new GraphQLObjectType({
  name:  'ReviewType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    movie: {
      type: require('./movie_type'),
      resolve(parentValue) {
        return Review.findById(parentValue).populate('movie')
          .then(review => {
            return review.movie
          });
      }
    }
  })
});

module.exports = ReviewType;

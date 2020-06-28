const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movie: {
    type: Schema.Types.ObjectId,
    ref: 'movie'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

ReviewSchema.statics.like = function(id) {
  const Review = mongoose.model('review');

  return Review.findById(id)
    .then(review => {
      ++review.likes;
      return review.save();
    })
}

mongoose.model('review', ReviewSchema);

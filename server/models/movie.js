const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

MovieSchema.statics.addReview = function (movieId, content) {
  const Review = mongoose.model("review");
  const Movie = mongoose.model("movie");

  return this.findById(movieId).then((movie) => {
    const review = new Review({ content, movie });
    movie.reviews.push(review);
    const updateMovie = Movie.findOneAndUpdate(
      { _id: movie._id },
      { reviews: movie.reviews }
    );
    return Promise.all([review.save(), updateMovie]).then(
      ([review, movie]) => movie
    );
  });
};

MovieSchema.statics.findReviews = function (id) {
  return this.findById(id)
    .populate("reviews")
    .then((movie) => movie.reviews);
};

MovieSchema.pre("save", function (done) {
  var self = this;
  mongoose.models["movie"].findOne({ title: self.title }, (err, user) => {
    if (user) {
      done(new Error("Le titre doit être unique !"));
    } else {
      done();
    }
  });
});
mongoose.model("movie", MovieSchema);

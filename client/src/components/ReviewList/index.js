/* eslint-disable import/no-unresolved */
import { useMutation } from "@apollo/react-hooks";
import { flowRight as compose } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import { Heart } from "react-feather";
import saveReviewMutation from "src/graphql/mutations/saveReview";
import "./reviewList.scss";

const ReviewList = ({ reviews }) => {
  const [saveReview] = useMutation(saveReviewMutation);

  const handleLike = (id, oldLikes) => {
    saveReview({
      variables: {
        id,
        optimisticResponse: {
          __typename: "Mutation",
          saveReview: {
            id,
            __typename: "ReviewType",
            likes: oldLikes + 1,
          },
        },
      },
    });
  };

  return (
    <div className="review-list">
      <ul className="reviews">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <li className="review" key={review.id}>
              {review.content}
              <div className="like">
                <Heart
                  className={
                    review.likes > 0 ? "button-like-full" : "button-like"
                  }
                  onClick={() => handleLike(review.id, review.likes)}
                />
                {review.likes}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      __typename: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default compose(
  graphql(saveReviewMutation, {
    name: "saveReviewMutation",
  })
)(ReviewList);

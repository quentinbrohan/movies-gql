import { flowRight as compose } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import addReviewMutation from "src/graphql/mutations/addReview";
import "./reviewCreate.scss";

const ReviewCreate = ({
  reviewValue,
  onChangeReviewValue,
  handleReviewSubmit,
  movieId,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleReviewSubmit(movieId);
  };

  const updateInput = (reviewValue) => {
    onChangeReviewValue(reviewValue);
  };

  return (
    <div className="review-create">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="review" className="active">
          Ajouter une review:
        </label>
        <input
          type="text"
          name="review"
          placeholder="Ma review"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={reviewValue}
          onChange={(evt) => updateInput(evt.currentTarget.value)}
        />
        <button type="submit">Ajouter la review</button>
      </form>
    </div>
  );
};

ReviewCreate.propTypes = {
  reviewValue: PropTypes.string.isRequired,
  movieId: PropTypes.string.isRequired,
  onChangeReviewValue: PropTypes.func.isRequired,
  handleReviewSubmit: PropTypes.func.isRequired,
};

export default compose(
  graphql(addReviewMutation, {
    name: "addReviewMutation",
  })
)(ReviewCreate);

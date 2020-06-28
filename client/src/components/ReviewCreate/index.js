/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import PropTypes from 'prop-types';

import createReviewMutation from 'src/queries/createReview';
import './reviewCreate.scss';

const ReviewCreate = ({
  inputReviewValue,
  changeInputReviewValue,
  manageReviewSubmit,
  movieId,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    manageReviewSubmit(movieId);
  };

  const updateInput = (inputReviewValue) => {
    changeInputReviewValue(inputReviewValue);
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
          value={inputReviewValue}
          onChange={(evt) => updateInput(evt.currentTarget.value)}
        />
        <button type="submit">Ajouter la review</button>

      </form>
    </div>
  );
};

ReviewCreate.propTypes = {
  inputReviewValue: PropTypes.string.isRequired,
  movieId: PropTypes.string.isRequired,
  changeInputReviewValue: PropTypes.func.isRequired,
  manageReviewSubmit: PropTypes.func.isRequired,

};

export default compose(
  graphql(createReviewMutation, {
    name: 'createReviewMutation',
  }),
)(ReviewCreate);

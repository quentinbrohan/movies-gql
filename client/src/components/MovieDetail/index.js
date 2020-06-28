/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ReviewList from 'src/components/ReviewList';

import ReviewCreate from 'src/components/ReviewCreate';
import readMovieQuery from 'src/queries/readMovie';
import './movieDetail.scss';

const MovieDetail = ({
  inputReviewValue,
  changeInputReviewValue,
  manageReviewSubmit,
  props,
  errors,
  readMovieQuery,
}) => {
  const { id } = props.match.params;
  // console.log(props);
  // console.log(readMovieQuery);

  return (
    <>
      {readMovieQuery.loading && <div>Chargement...</div>}
      {!readMovieQuery.loading && (

      <div className="movie-detail">
        <h1>{readMovieQuery.movie.title} </h1>
        <ReviewList reviews={readMovieQuery.movie.reviews} />
        <ReviewCreate
          movieId={id}
          inputReviewValue={inputReviewValue}
          changeInputReviewValue={changeInputReviewValue}
          manageReviewSubmit={manageReviewSubmit}
        />
      </div>
      )}
      {errors.length > 0 && (
      <div className="errors">
        {errors.map((error) => (
          <p className="error-message" key={error}>
            {error}
          </p>
        ))}
      </div>
      )}
      <Link to="/">
        <button type="button">
          Retour à la liste des films
        </button>
      </Link>
    </>
  );
};

MovieDetail.propTypes = {
  inputReviewValue: PropTypes.string,
  changeInputReviewValue: PropTypes.func.isRequired,
  manageReviewSubmit: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object.isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  errors: PropTypes.array.isRequired,
  readMovieQuery: PropTypes.object.isRequired,
};

MovieDetail.defaultProps = {
  inputReviewValue: '',
};

export default compose(
  graphql(readMovieQuery, {
    name: 'readMovieQuery',
    options: (props) => ({
      variables: {
        id: props.props.match.params.id,
      },
    }),
  }),
)(MovieDetail);

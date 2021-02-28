/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import { flowRight as compose } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import ReviewCreate from "src/components/ReviewCreate";
import ReviewList from "src/components/ReviewList";
import getMovieByIdQuery from "src/graphql/queries/getMovieById";
import "./movieDetail.scss";

const MovieDetail = ({
  reviewValue,
  onChangeReviewValue,
  handleReviewSubmit,
  props,
  errors,
  getMovieByIdQuery,
}) => {
  const { id } = props.match.params;

  return (
    <>
      {getMovieByIdQuery.loading && <div>Chargement...</div>}
      {!getMovieByIdQuery.loading && (
        <div className="movie-detail">
          <h1>{getMovieByIdQuery.movie.title} </h1>
          <ReviewList reviews={getMovieByIdQuery.movie.reviews} />
          <ReviewCreate
            movieId={id}
            reviewValue={reviewValue}
            onChangeReviewValue={onChangeReviewValue}
            handleReviewSubmit={handleReviewSubmit}
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
        <button type="button" className="secondary">
          Retour à la liste des films
        </button>
      </Link>
    </>
  );
};

MovieDetail.propTypes = {
  reviewValue: PropTypes.string,
  onChangeReviewValue: PropTypes.func.isRequired,
  handleReviewSubmit: PropTypes.func.isRequired,
  props: PropTypes.object.isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object.isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  errors: PropTypes.array.isRequired,
  getMovieByIdQuery: PropTypes.object.isRequired,
};

MovieDetail.defaultProps = {
  reviewValue: "",
};

export default compose(
  graphql(getMovieByIdQuery, {
    name: "getMovieByIdQuery",
    options: (props) => ({
      variables: {
        id: props.props.match.params.id,
      },
    }),
  })
)(MovieDetail);

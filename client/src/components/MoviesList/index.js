/* eslint-disable import/no-unresolved */
import { useMutation } from "@apollo/react-hooks";
import { flowRight as compose } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import { XSquare } from "react-feather";
import { Link } from "react-router-dom";
import deleteMovieMutation from "src/graphql/mutations/deleteMovie";
import getMoviesQuery from "src/graphql/queries/getMovies";
import "./moviesList.scss";

const MoviesList = (props) => {
  const { movies, loading } = props.getMoviesQuery;
  const [deleteMovie] = useMutation(deleteMovieMutation);

  const handleDelete = (id) => {
    deleteMovie({
      variables: {
        id,
      },
      refetchQueries: [{ query: getMoviesQuery }],
    });
  };

  return (
    <div className="movies-list">
      <h1>Liste des films</h1>
      <ul>
        {!loading &&
          movies?.map((movie) => (
            <li className="movie" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              <XSquare
                className="button-delete"
                onClick={() => handleDelete(movie.id)}
              />
            </li>
          ))}
        {loading && <div>Chargement des données...</div>}
      </ul>
      <Link to="/movies/create">
        <button type="button">Ajouter un film</button>
      </Link>
    </div>
  );
};

MoviesList.propTypes = {
  getMoviesQuery: PropTypes.object.isRequired,
};

export default compose(
  graphql(getMoviesQuery, {
    name: "getMoviesQuery",
  }),
  graphql(deleteMovieMutation, {
    name: "deleteMovieMutation",
  })
)(MoviesList);

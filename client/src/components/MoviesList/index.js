/* eslint-disable import/no-unresolved */
import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { useMutation } from '@apollo/react-hooks';

import PropTypes from 'prop-types';

import readMoviesQuery from 'src/queries/readMovies';
import deleteMovieMutation from 'src/queries/deleteMovie';

import { XSquare } from 'react-feather';
import './moviesList.scss';

const MoviesList = (props) => {
  const { movies, loading } = props.readMoviesQuery;
  const [deleteMovie] = useMutation(deleteMovieMutation);

  const handleDelete = (id) => {
    deleteMovie({
      variables: {
        id,
      },
      refetchQueries: [{ query: readMoviesQuery }],
    });
  };

  return (
    <div className="movies-list">
      <h1>Liste de films</h1>
      <ul>
        {!loading && (
          movies.map((movie) => (
            <li className="movie" key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                {movie.title}
              </Link>
              <XSquare
                className="button-delete"
                onClick={() => handleDelete(movie.id)}
              />
            </li>
          ))
        )}
        {loading && <div>Chargement des données...</div>}
      </ul>
      <Link to="/movies/create">
        <button type="button">Ajouter un film</button>
      </Link>
    </div>
  );
};

MoviesList.propTypes = {
  readMoviesQuery: PropTypes.object.isRequired,
};

export default compose(
  graphql(readMoviesQuery, {
    name: 'readMoviesQuery',
  }),
  graphql(deleteMovieMutation, {
    name: 'deleteMovieMutation',
  }),
)(MoviesList);

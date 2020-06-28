/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import createMovieMutation from 'src/queries/createMovie';

import './movieCreate.scss';

const MovieCreate = ({
  inputTitleValue,
  changeInputTitleValue,
  manageSubmit,
  errors,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    manageSubmit();
  };

  const updateInput = (inputTitleValue) => {
    changeInputTitleValue(inputTitleValue);
  };
  // console.log(errors);

  return (
    <div className="movie-add">
      <h1>Ajouter un film</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Titre:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Titre du film"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={inputTitleValue}
          onChange={(evt) => updateInput(evt.currentTarget.value)}
        />
        <button type="submit">Ajouter</button>
      </form>
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
    </div>
  );
};

MovieCreate.propTypes = {
  inputTitleValue: PropTypes.string.isRequired,
  changeInputTitleValue: PropTypes.func.isRequired,
  manageSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};

export default graphql(createMovieMutation)(MovieCreate);

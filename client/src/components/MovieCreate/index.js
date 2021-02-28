/* eslint-disable import/no-unresolved */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from "prop-types";
import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import addMovieMutation from "src/graphql/mutations/addMovie";
import "./movieCreate.scss";

const MovieCreate = ({
  titleValue,
  onChangeTitleValue,
  handleMovieSubmit,
  errors,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleMovieSubmit();
  };

  const updateInput = (titleValue) => {
    onChangeTitleValue(titleValue);
  };

  return (
    <div className="movie-add">
      <h1>Ajouter un film</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          name="title"
          placeholder="Titre du film"
          autoFocus
          value={titleValue}
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
        <button type="button" className="secondary">
          Retour à la liste des films
        </button>
      </Link>
    </div>
  );
};

MovieCreate.propTypes = {
  titleValue: PropTypes.string.isRequired,
  onChangeTitleValue: PropTypes.func.isRequired,
  handleMovieSubmit: PropTypes.func.isRequired,
  errors: PropTypes.array.isRequired,
};

export default graphql(addMovieMutation)(MovieCreate);

/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
// == Import npm
import React, { useState, useEffect } from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import createMovieMutation from 'src/queries/createMovie';
import readMoviesQuery from 'src/queries/readMovies';
// import readMovieQuery from 'src/queries/readMovie';
import createReviewMutation from 'src/queries/createReview';

import { useMutation } from '@apollo/react-hooks';

import MoviesList from 'src/components/MoviesList';
import MovieCreate from 'src/components/MovieCreate';
import MovieDetail from 'src/components/MovieDetail';

// == Import
import './styles.scss';

// == Composant
const App = () => {
  const [inputTitleValue, setInputTitleValue] = useState('');
  const [inputReviewValue, setInputReviewValue] = useState('');
  const [errors, setErrors] = useState([]);

  const [addMovie] = useMutation(createMovieMutation);
  const [createReview] = useMutation(createReviewMutation);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    // Nettoyage tableau erreurs
    setErrors([]);
  }, [location.pathname]);

  // AddMovie
  const changeInputTitleValue = (newInputValue) => {
    setInputTitleValue(newInputValue);
  };

  const manageSubmit = () => {
    if (inputTitleValue.trim() === '') {
      setErrors(['Le titre ne peut être vide !']);
      return;
    }

    // Mutation
    addMovie({
      variables: {
        title: inputTitleValue.trim(),
      },
      refetchQueries: [{ query: readMoviesQuery }],
    })
      // Redirect vers /movies
      .then(() => {
        history.push('/');
      })
      .catch((errors) => {
        // console.log(errors);
        // console.log(errors.graphQLErrors);
        const errorMessages = errors.graphQLErrors.map((error) => error.message);
        setErrors(errorMessages);
      });
    // Clear input
    setInputTitleValue('');
  };

  // AddReview
  const changeInputReviewValue = (newInputReviewValue) => {
    setInputReviewValue(newInputReviewValue);
  };

  const manageReviewSubmit = (movieId) => {
    if (inputReviewValue.trim() === '') {
      setErrors(['La review ne peut être vide !']);
      return;
    }
    createReview({
      variables: {
        content: inputReviewValue,
        movieId,
      },
    });
    setInputReviewValue('');
  };

  return (
    <div className="app">
      <header>
        <h1>Movies GQL</h1>
      </header>
      <Switch>
        <Route exact path="/" component={MoviesList} />
        <Route
          exact
          path="/movies/create"
          render={() => (
            <MovieCreate
              changeInputTitleValue={changeInputTitleValue}
              inputTitleValue={inputTitleValue}
              manageSubmit={manageSubmit}
              errors={errors}
            />
          )}
        />
        <Route
          exact
          path="/movie/:id"
          render={(props) => (
            <MovieDetail
              changeInputReviewValue={changeInputReviewValue}
              inputReviewValue={inputReviewValue}
              manageReviewSubmit={manageReviewSubmit}
              props={props}
              errors={errors}
            />
          )}
        />
      </Switch>
    </div>
  );
};

// == Export
export default App;

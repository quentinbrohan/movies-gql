import { useMutation } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MovieCreate from "src/components/MovieCreate";
import MovieDetail from "src/components/MovieDetail";
import MoviesList from "src/components/MoviesList";
import addMovieMutation from "src/graphql/mutations/addMovie";
import addReviewMutation from "src/graphql/mutations/addReview";
import getMoviesQuery from "src/graphql/queries/getMovies";
import "./styles.scss";

const App = () => {
  const [titleValue, setTitleValue] = useState("");
  const [reviewValue, setReviewValue] = useState("");
  const [errors, setErrors] = useState([]);

  const [addMovie] = useMutation(addMovieMutation);
  const [addReview] = useMutation(addReviewMutation);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setErrors([]);
  }, [location.pathname]);

  const onChangeTitleValue = (newInputValue) => {
    setTitleValue(newInputValue);
  };

  const handleMovieSubmit = () => {
    if (titleValue.trim() === "") {
      setErrors(["Le titre ne peut pas être vide !"]);
      return;
    }

    addMovie({
      variables: {
        title: titleValue.trim(),
      },
      refetchQueries: [{ query: getMoviesQuery }],
    })
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        const errorMessages = err.graphQLErrors.map((error) => error.message);
        setErrors(errorMessages);
      });
    setTitleValue("");
  };

  const onChangeReviewValue = (newInputReviewValue) => {
    setReviewValue(newInputReviewValue);
  };

  const handleReviewSubmit = (movieId) => {
    if (reviewValue.trim() === "") {
      setErrors(["La review ne peut être vide !"]);
      return;
    }
    addReview({
      variables: {
        content: reviewValue,
        movieId,
      },
    });
    setReviewValue("");
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
              onChangeTitleValue={onChangeTitleValue}
              titleValue={titleValue}
              handleMovieSubmit={handleMovieSubmit}
              errors={errors}
            />
          )}
        />
        <Route
          exact
          path="/movie/:id"
          render={(props) => (
            <MovieDetail
              onChangeReviewValue={onChangeReviewValue}
              reviewValue={reviewValue}
              handleReviewSubmit={handleReviewSubmit}
              props={props}
              errors={errors}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default App;

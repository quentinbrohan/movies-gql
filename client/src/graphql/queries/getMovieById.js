import gql from "graphql-tag";

export default gql`
  query getMovieById($id: ID!) {
    movie(id: $id) {
      id
      title
      reviews {
        id
        content
        likes
      }
    }
  }
`;

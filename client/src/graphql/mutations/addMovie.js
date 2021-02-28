import gql from "graphql-tag";

export default gql`
  mutation addMovie($title: String) {
    addMovie(title: $title) {
      id
      title
    }
  }
`;

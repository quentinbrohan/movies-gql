import gql from "graphql-tag";

export default gql`
  mutation saveReview($id: ID) {
    saveReview(id: $id) {
      id
      likes
    }
  }
`;

import gql from 'graphql-tag';

export default gql`
mutation LikeReview($id: ID){
  likeReview(id: $id){
    id,
    likes
  }
}
`;

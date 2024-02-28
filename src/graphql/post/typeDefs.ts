export const typeDefs = `#graphql
    type Post {
        id: ID!
        text: String!
        postImageURL: String
        user: User!
    }
`

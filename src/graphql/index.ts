import User from '../graphql/user'
import Post from '../graphql/post'
import { ApolloServer } from '@apollo/server';



const typeDefs = `#graphql

     ${User.typeDefs}
     ${Post.typeDefs}

     type Query {
      ${User.queries}
      ${Post.queries}
     }
  
     type Mutation {
       ${User.mutations}
       ${Post.mutations}
    }
  `;

  const resolvers = {
    Query: {
        ...User.resolvers.query,
        ...Post.resolvers.query
    },
    Mutation: {
      ...User.resolvers.mutation,
      ...Post.resolvers.mutation
    },
    ...Post.resolvers.resolver
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server


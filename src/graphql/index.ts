import User from '../graphql/user'
import { ApolloServer } from '@apollo/server';



const typeDefs = `

     ${User.typeDefs}

     type Query {
      ${User.queries}
     }
  
     type Mutation {
       ${User.mutations}
    }
  `;

  const resolvers = {
    Query: {
        ...User.resolvers.query,
    },
    Mutation: {
      ...User.resolvers.mutation
    }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server


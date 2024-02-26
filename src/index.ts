import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import graphqlServer from './graphql/index'
import UserService from './services/user';

const init = async () => {
  
  const app = express();  
  const PORT = 8000

  await graphqlServer.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(graphqlServer, {
      context: async ({ req }) => { 
        const token = req.headers.token;
        try {
          const user = UserService.decodeUser(token as string)
          return { user }
        } catch (error) {
          return {}
        }
        
      },
    }),
  );

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at: http://localhost:8000/graphql`)
  );
}


init()
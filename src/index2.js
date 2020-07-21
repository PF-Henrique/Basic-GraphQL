const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// type checking
// query vs. mutation
// objects
// arrays
// arguments
// crud

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello(name: String): String
    user: User
  }
  type User {
    id: ID!
    username: String
    firstLetterOfUsername: String
  }
  type Error {
    field: String!
    message: String!
  }
  type RegisterResponse {
    errors: [Error!]!
    user: User
  }
  input UserInfo {
    username: String!
    password: String!
    age: Int
  }
  type Mutation {
    register(userInfo: UserInfo!): RegisterResponse!
    login(userInfo: UserInfo!): String!
  }
  type Subscription {
    newUser: User!
  }
`;

const NEW_USER = "NEW_USER";


// Provide resolver functions for your schema fields
const resolvers = {
  Subscription: {
    newUser: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_USER)
    }
  },
  User: {
    firstLetterOfUsername: parent => {
      console.log(parent);
      return parent.username ? parent.username[0] : null;
    }
    // username: parent => { return parent.username;
    // }
  },
  Query: {
    hello: (parent, { name }) => {
      return `hey ${name}`;
    },
    user: () => ({
      id: 1,
      username: "tom"
    })
  },
  Mutation: {
    login: async (parent, { userInfo: { username } }, context) => {
      // check the password
      // await checkPassword(password);
      return username;
    },

    register: (_, { userInfo: { username } }, { pubsub }) => {
      const user = {
        id: 1,
        username
      };

      pubsub.publish(NEW_USER, {
        newUser: user
      });

      return {
        errors: [
          {
            field: "username",
            message: "bad"
          },
          {
            field: "username2",
            message: "bad2"
          }
        ],
        user
      };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);

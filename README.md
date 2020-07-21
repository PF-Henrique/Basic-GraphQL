# Basic-GraphQL
# CMR GraphQL

This project provides a [GraphQL](https://graphql.org/) interface to CMR search. It runs on top of the CMR and 
can be deployed independently. No changes were made to the CMR to support this effort (BADGE #1).

```
                 -----------------            ---------
   \O/           |               |            |       |
    |  --------> |  CMR GraphQL  | ---------> |  CMR  |
   / \           |               |            |       |
   USER          -----------------            ---------
```

A schema describing collections and granules and their relationship is defined as part of this project.
This schema is then used to parse and validate queries that request collections/granules in whole or in
part, which is to say, the requester can ask for just those fields in which they are interested.


It not only identifies the invalid field, `box`, but is clever enough to suggest the correct field, `boxes`.

The project can be run locally or deployed as a Lambda Function. Directions for building and running are
given in the following sections.

## Building the GraphQL Server

In the `cmr-graphql/graphql` directory, run the following command (requires [npm](https://www.npmjs.com/get-npm)):

```bash
npm install
```

## Running Locally

The system can be launched locally by running the following command in the `cmr-graphql/graphql` directory:

```bash
npm start
```
Then open http://localhost:4000/graphql in a browser. Enter a query in the left side of the playground interface
then hit the `play` icon.
Example:

```
{
  type User {
    id: ID!
    username: String
    firstLetterOfUsername: String
  }
}
```



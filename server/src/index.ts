import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";

// TODO: move this stuff somewhere else
interface User {
    id: number,
    name: string,
    email: string,
};

const users: User[] = [
    {
        id: 1,
        name: "foo",
        email: "foo@example.com",
    },
    {
        id: 2,
        name: "bar",
        email: "bar@example.com",
    }
];

const typeDefs = gql(readFileSync(path.join(__dirname, "./schema.gql"), "utf-8"));

const resolvers = {
    Query: {
        getUsers: () => users,
    },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
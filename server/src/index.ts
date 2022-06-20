import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import { join } from "path";

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
    },
    {
        id: 3,
        name: "baz",
        email: "baz@example.com",
    }
];

const typeDefs = gql(readFileSync(join(__dirname, "./schema.gql"), "utf-8"));

const resolvers = {
    Query: {
        getUsers: () => users,
    },
    Mutation: {
        updateUser: async (_: never, variables: { id: number, input: { name: string, email: string }}) => {
            await new Promise(resolve => setTimeout(resolve, 5000));

            const { id, input } = variables;
            const user = users.find(u => u.id === id);
            if (!user) throw "UserNotFound";
            user.name = input.name;
            user.email = input.email;
            //if (true) throw "foo";
            return user;
        },
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
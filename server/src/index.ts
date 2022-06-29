import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

interface Attachment {
  id: string;
  name: string;
}

interface ToDo {
  id: string;
  title: string;
  body?: string;
  status: "OPEN" | "CLOSED" | "DELETED";
  attachments?: Array<Attachment>;
}

const todos: ToDo[] = [
  {
    id: randomUUID(),
    title: "first todo",
    status: "OPEN",
  },
  {
    id: randomUUID(),
    title: "second todo",
    status: "OPEN",
    attachments: [
      {
        id: randomUUID(),
        name: "attachment_1.pdf",
      },
      {
        id: randomUUID(),
        name: "attachment_2.pdf",
      }
    ],
  }
];

// ToDo helpers
const getTodoById = (id: string): ToDo => {
  const todo = todos.find(todo => todo.id === id);
  if (!todo) throw new Error(`ToDo ${id} not found`);
  return todo;
};
const updateTodo = (id: string, mutator: (todo: ToDo) => void): ToDo => {
  const todo = getTodoById(id);
  mutator(todo);
  return todo;
};

// other helpers
const delay = async (milli: number) => await new Promise(resolve => setTimeout(resolve, milli));

const typeDefs = gql(readFileSync(join(__dirname, "./schema.gql"), "utf-8"));

const resolvers = {
  ToDo: {
    body: (todo: ToDo) => todo.body || "",
    attachments: (todo: ToDo) => todo.attachments || [],
    attachmentCount: (todo: ToDo) => todo.attachments?.length || 0,
  },
  Query: {
    todos: (_: never, variables: { statuses: Array<ToDo['status']> }) => {
      const { statuses } = variables;
      return (!statuses || statuses.length === 0)
      ? todos.reverse()
      : todos.filter(todo => statuses.includes(todo.status)).reverse();
    },
    todo: (_: never, variables: { id: string }) => {
      return getTodoById(variables.id);
    },
  },
  Mutation: {
    createToDo: (_: never, variables: { title: string }): ToDo => {
      const todo: ToDo = {
        id: randomUUID(),
        title: variables.title,
        status: "OPEN",
      };
      todos.push(todo);
      return todo;
    },
    closeToDo: (_: never, variables: { id: string }): ToDo => {
      return updateTodo(variables.id, todo => todo.status = "CLOSED");
    },
    openToDo: (_: never, variables: { id: string }): ToDo => {
      return updateTodo(variables.id, todo => todo.status = "OPEN");
    },
    editToDo: async (_: never, variables: { id: string, changes: { title?: string, body?: string }}): Promise<ToDo> => {
      // use to demo optimistic response
      // await delay(5000);
      // if (true) throw "oops";
      return updateTodo(variables.id, todo => {
        const { title, body } = variables.changes;
        todo.title = title || todo.title;
        todo.body = body || todo.body;
      });
    },
    deleteToDo: (_: never, variables: { id: string }): boolean => {
      updateTodo(variables.id, todo => todo.status = "DELETED");
      return true;
    },
    addAttachment: (_: never, variables: { toDo: string, name: string }): Attachment => {
      const todo = getTodoById(variables.toDo);
      const attachment: Attachment = {
        id: randomUUID(),
        name: variables.name,
      };
      todo.attachments = [...(todo.attachments || []), attachment];
      return attachment;
    },
    removeAttachment: (_: never, variables: { id: string }): boolean => {
      const attachmentId = variables.id;
      const todo = todos.find(todo => {
        return (todo.attachments || []).map(att => att.id).includes(attachmentId);
      });
      if (todo) {
        todo.attachments = (todo.attachments || []).filter(att => att.id !== attachmentId);
      }
      return true;
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

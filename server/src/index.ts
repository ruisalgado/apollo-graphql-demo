import { ApolloServer, gql } from "apollo-server";
import { readFileSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

interface Step {
  id: string;
  title: string;
  completed: boolean;
}

interface ToDo {
  id: string;
  order: number;
  title: string;
  body: string;
  status: "OPEN" | "CLOSED" | "DELETED";
  steps: Array<Step>;
}

const todos: ToDo[] = [
  {
    id: randomUUID(),
    order: 1,
    title: "first todo",
    body: "",
    status: "OPEN",
    steps: [],
  },
  {
    id: randomUUID(),
    order: 2,
    title: "second todo",
    body: "",
    status: "OPEN",
    steps: [
      {
        id: randomUUID(),
        title: "step 1",
        completed: false,
      },
      {
        id: randomUUID(),
        title: "step 2",
        completed: true,
      }
    ],
  }
];

// ToDo helpers
const nextTodoId = (): string => randomUUID();
const nextTodoOrder = (): number => {
  const increment = 1000;
  const largerOrder = todos.map(todo => todo.order).sort((a, b) => a - b)[0] || 0;
  return largerOrder + increment;
};
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

// Step helpers
const nextStepId = (): string => randomUUID();
const getStepById = (id: string): Step => {
  const step = todos.flatMap(todo => todo.steps).find(step => step.id === id);
  if (!step) throw new Error(`Step ${id} not found`);
  return step;
};

const typeDefs = gql(readFileSync(join(__dirname, "./schema.gql"), "utf-8"));

const resolvers = {
  ToDo: {
    stepsCompleted: (todo: ToDo) => todo.steps.filter(step => step.completed).length,
    stepsCount: (todo: ToDo) => todo.steps.length,
  },
  Query: {
    todos: (_: never, variables: { statuses: Array<ToDo['status']> }) => {
      const { statuses } = variables;
      return (!statuses || statuses.length === 0)
      ? todos
      : todos.filter(todo => statuses.includes(todo.status));
    },
    todo: (_: never, variables: { id: string }) => {
      return getTodoById(variables.id);
    },
  },
  Mutation: {
    createToDo: (_: never, variables: { title: string }): ToDo => {
      const todo: ToDo = {
        id: nextTodoId(),
        order: nextTodoOrder(),
        title: variables.title,
        body: "",
        status: "OPEN",
        steps: [],
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
    editToDo: (_: never, variables: { id: string, changes: { title?: string, body?: string }}): ToDo => {
      return updateTodo(variables.id, todo => {
        const { title, body } = variables.changes;
        todo.title = title || todo.title;
        todo.body = body || todo.body;
      });
    },
    addToDoStep: (_: never, variables: { toDo: string, title: string }): Step => {
      const todo = getTodoById(variables.toDo);
      const step: Step = {
        id: nextStepId(),
        title: variables.title,
        completed: false,
      };
      todo.steps.push(step);
      return step;
    },
    closeStep: (_: never, variables: { id: string }): Step => {
      const step = getStepById(variables.id);
      step.completed = true;
      return step;
    },
    openStep: (_: never, variables: { id: string }): Step => {
      const step = getStepById(variables.id);
      step.completed = false;
      return step;
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

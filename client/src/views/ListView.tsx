import React from "react";
import { useAddToDoMutation, useVisibleToDosQuery, VisibleToDosDocument, AbbreviatedToDoFragment } from "../generated/graphql";
import { NavigationContext } from "../NavigationContext";

const ToDoList = (props: {
  title: string,
  todos: Array<AbbreviatedToDoFragment>,
  onSelect?: (todo: AbbreviatedToDoFragment) => void,
}) => {
  const { title, todos, onSelect } = props;
  return (
    <>
        <h1>{title}</h1>
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                  {todo.title}
                  {onSelect && <a href="#" onClick={() => onSelect(todo)}>edit</a>}
                </li>
            ))}
        </ul>
    </>
  );
};

const ToDoAdd = () => {
  const [title, setTitle] = React.useState("");
  const todoInput = { title };

  const [updateUser, { loading, data, error }] = useAddToDoMutation({
    variables: todoInput,
    refetchQueries: [VisibleToDosDocument],
    onCompleted: () => setTitle(""),
  });

  console.log({ loading, data, error });

  return (
      <section>
          <h1>Add ToDo</h1>
          <form onSubmit={e => {
            e.preventDefault();
            updateUser();
          }}>
              <label>
                  title:
                  <input name="title" type="text" required value={title} onChange={e => setTitle(e.target.value)}></input>
              </label>
              <input type="submit" />
          </form>
          {error && <p>{error.message}</p>}
      </section>
  );
};

export const ListView = () => {
  const { setActiveView } = React.useContext(NavigationContext);
  const { loading, data, error } = useVisibleToDosQuery({
    fetchPolicy: 'cache-first', // the default
  });

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error {JSON.stringify(error)}</h1>;

  const openItems = (data?.todos || []).filter(todo => todo.status === "OPEN");
  const closedItems = (data?.todos || []).filter(todo => todo.status === "CLOSED");

  const onSelectTodo = (todo: AbbreviatedToDoFragment) => setActiveView(['DetailView', { toDoId: todo.id }]);

  return (
      <>
        <h1>Caveman TODO app</h1>
        <ToDoList title="To do" todos={openItems} onSelect={onSelectTodo} />
        <ToDoList title="Done" todos={closedItems} />
        <ToDoAdd />
      </>
  );
};

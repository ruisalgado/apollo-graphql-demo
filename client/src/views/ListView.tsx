import React from "react";
import { NavigationContext } from "../NavigationContext";
import {
  AbbreviatedToDoFragment,
  VisibleToDosQuery,
  VisibleToDosDocument,
  useAddToDoMutation,
  useCheckToDoMutation,
  useDeleteToDoMutation,
  useUncheckToDoMutation,
  useVisibleToDosQuery,
} from "../generated/graphql";

const ToDoList = (props: {
  title: string,
  todos: Array<AbbreviatedToDoFragment>,
  onToggle: (todo: AbbreviatedToDoFragment) => void,
  onEdit?: (todo: AbbreviatedToDoFragment) => void,
  onDelete?: (todo: AbbreviatedToDoFragment) => void,
}) => {
  const { title, todos, onToggle, onEdit, onDelete } = props;
  return (
    <>
        <h1>{title}</h1>
        <ul>
            {todos.map(todo => (
                <li key={todo.id}>
                  <input type="checkbox" checked={todo.status === "CLOSED"} onChange={() => onToggle(todo)}></input>
                  {todo.title}
                  {todo.attachmentCount > 0 && <span>attachments ({todo.attachmentCount})</span>}
                  {onEdit && <button onClick={() => onEdit(todo)}>edit</button>}
                  {onDelete && <button onClick={() => onDelete(todo)}>delete</button>}
                </li>
            ))}
        </ul>
    </>
  );
};

const ToDoAdd = () => {
  const [title, setTitle] = React.useState("");
  const todoInput = { title };

  const [updateUser, { error }] = useAddToDoMutation({
    variables: todoInput,
    refetchQueries: [VisibleToDosDocument],
    onCompleted: () => setTitle(""),
  });

  return (
      <section>
          <h1>Add ToDo</h1>
          <form onSubmit={e => {
            e.preventDefault();
            updateUser();
          }}>
              <label>
                  title:
                  <input name="title" type="text" required value={title} onChange={e => setTitle(e.target.value)} />
              </label>
              <input type="submit" />
          </form>
          {error && <p>{error.message}</p>}
      </section>
  );
};

export const ListView = () => {
  const { setActiveView } = React.useContext(NavigationContext);

  // mutations
  const [checkToDo] = useCheckToDoMutation();
  const [uncheckToDo] = useUncheckToDoMutation();
  const [deleteToDo] = useDeleteToDoMutation();

  // query
  const { loading, data, error, refetch } = useVisibleToDosQuery({
    fetchPolicy: 'cache-and-network', // cache-first is the default policy
  });

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error {JSON.stringify(error)}</h1>;

  const onToggleTodo = (todo: AbbreviatedToDoFragment) => {
    // example of updating the cache by re-fetching query
    if (todo.status === "OPEN") {
      checkToDo({
        variables: { id: todo.id },
        refetchQueries: [VisibleToDosDocument],
      });
    }
    // example of updating the cache without re-fetching
    if (todo.status === "CLOSED") {
      uncheckToDo({
        variables: { id: todo.id },
        updateQueries: {
          visibleToDos: (previous, { mutationResult }): VisibleToDosQuery => {
            const updatedToDo = mutationResult.data?.openToDo;
            if (!updatedToDo) return previous as VisibleToDosQuery;
            const todos = (previous["todos"] as VisibleToDosQuery["todos"]).map(todo => {
              return todo.id === updatedToDo.id ? updatedToDo : todo;
            });
            return { todos };
          },
        },
      });
    }
  };

  const onEditTodo = (todo: AbbreviatedToDoFragment) => setActiveView(["DetailView", { toDoId: todo.id }]);

  const onDeleteTodo = (todo: AbbreviatedToDoFragment) => {
    deleteToDo({
      variables: { id: todo.id },
      // example of cache eviction
      update: (cache) => {
        cache.evict({ id: cache.identify(todo) });
      },
    });
  };

  const openItems = (data?.todos || []).filter(todo => todo.status === "OPEN");
  const closedItems = (data?.todos || []).filter(todo => todo.status === "CLOSED");

  return (
      <>
        <h1>Caveman TODO app</h1>
        <ToDoList title="To do" todos={openItems} onToggle={onToggleTodo} onDelete={onDeleteTodo} onEdit={onEditTodo} />
        <ToDoList title="Done" todos={closedItems} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
        <ToDoAdd />
        <button onClick={() => refetch()}>Refresh</button>
      </>
  );
};

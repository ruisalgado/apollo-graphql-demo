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
import { SubHeader } from "./Headers";
import { ButtonRow, Card, Section } from "./Containers";
import styles from "./ListView.module.css";

const ToDoList = (props: {
  title: string,
  todos: Array<AbbreviatedToDoFragment>,
  onToggle: (todo: AbbreviatedToDoFragment) => void,
  onEdit?: (todo: AbbreviatedToDoFragment) => void,
  onDelete?: (todo: AbbreviatedToDoFragment) => void,
}) => {
  const { title, todos, onToggle, onEdit, onDelete } = props;
  if (!todos.length) return null;

  const decorate = (todo: AbbreviatedToDoFragment) => ({
    ...todo,
    checked: todo.status === "CLOSED",
  });

  return (
    <Section>
        <SubHeader>{title}</SubHeader>
        {todos.map(decorate).map(todo => (
            <Card key={todo.id}>
              <input type="checkbox" checked={todo.checked} onChange={() => onToggle(todo)}></input>
              <p className={styles.listItemTitle}>
                <span className={todo.checked ? styles.listItemTitleChecked : undefined}>{todo.title}</span>
                {todo.attachmentCount > 0 && <small>attachments ({todo.attachmentCount})</small>}
              </p>
              <ButtonRow>
                {onEdit && <button onClick={() => onEdit(todo)}>edit</button>}
                {onDelete && <button onClick={() => onDelete(todo)}>delete</button>}
              </ButtonRow>
            </Card>
        ))}
    </Section>
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
      <section className={styles.addToDoSection}>
        <form onSubmit={e => {
            e.preventDefault();
            updateUser();
          }}>
            <input placeholder="Add a to-do" name="title" type="text" required value={title} onChange={e => setTitle(e.target.value)} />
            <input type="submit" value="save" />
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
            const previousQuery = previous as VisibleToDosQuery;
            const updatedToDo = mutationResult.data?.openToDo;
            if (!updatedToDo) return previousQuery;
            const todos = previousQuery["todos"].map(todo => {
              return todo.id === updatedToDo.id ? updatedToDo : todo;
            });
            return { ...previousQuery, todos };
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
        <ToDoAdd />
        <ToDoList title="todo" todos={openItems} onToggle={onToggleTodo} onDelete={onDeleteTodo} onEdit={onEditTodo} />
        <ToDoList title="done" todos={closedItems} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
        <ButtonRow>
          <button onClick={() => refetch()}>Refetch</button>
        </ButtonRow>
      </>
  );
};

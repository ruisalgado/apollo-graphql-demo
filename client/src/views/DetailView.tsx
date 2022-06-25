import React from "react";
import { DetailedToDoFragment, useEditToDoMutation, useToDoQuery } from "../generated/graphql";
import { NavigationContext } from "../NavigationContext";

const ToDoEdit = (props: { todo: DetailedToDoFragment }) => {
  const [formState, setFormState] = React.useState({
    title: props.todo.title,
    body: props.todo.body,
  });

  const [editToDo] = useEditToDoMutation();

  const flushChanges = React.useCallback(() => {
    editToDo({
      variables: {
        ...formState,
        id: props.todo.id,
      },
      // example of optimistic response
      optimisticResponse: {
        editToDo: {
          ...props.todo,
          ...formState,
        },
      },
    });

  }, [editToDo, props.todo, formState]);

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label>
        title:
        <input name="title" type="text" required value={formState.title} onChange={e => setFormState({ ...formState, title: e.target.value })} onBlur={flushChanges} />
      </label>
      <label>
        body:
        <textarea name="body" rows={5} value={formState.body} onChange={e => setFormState({ ...formState, body: e.target.value })} onBlur={flushChanges} />
      </label>
    </form>
  )
};

const AttachmentsList = (props: { attachments: DetailedToDoFragment["attachments"] }) => {
  return (
    <>
      <h2>Attachments</h2>
      <ul>
          {props.attachments.map(att => (
            <li key={att.id}>
              {att.name}
            </li>
          ))}
      </ul>
    </>
  );
}

export const DetailView = (props: { toDoId: string }) => {
  const { setActiveView } = React.useContext(NavigationContext);
  const { data } = useToDoQuery({
    variables: { id: props.toDoId },
  });

  const todo = data?.todo;

  return (
    <section>
      <h1>DetailView</h1>
      {todo && (
        <>
          <ToDoEdit todo={todo} />
          <AttachmentsList attachments={todo.attachments || []} />
        </>
      )}
      <button onClick={() => setActiveView('ListView')}>back</button>
    </section>
  );
};

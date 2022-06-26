import React from "react";
import { DetailedToDoFragment, useEditToDoMutation, useToDoQuery } from "../generated/graphql";
import { NavigationContext } from "../NavigationContext";
import { ButtonRow, Card, Section } from "./Containers";
import { SubHeader } from "./Headers";
import styles from "./DetailView.module.css";

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
    <Card>
      <form className={styles.todoForm} onSubmit={e => e.preventDefault()}>
        <label htmlFor="title">title:</label>
        <input id="title" type="text" required value={formState.title} onChange={e => setFormState({ ...formState, title: e.target.value })} onBlur={flushChanges} />
        <label htmlFor="body">body:</label>
        <textarea id="body" rows={5} value={formState.body} onChange={e => setFormState({ ...formState, body: e.target.value })} onBlur={flushChanges} />
      </form>
    </Card>
  )
};

const AttachmentsList = (props: { attachments: DetailedToDoFragment["attachments"] }) => {
  if (!props.attachments) return null;

  return (
    <Section>
      <SubHeader>Attachments</SubHeader>
      <Card>
        <ul className={styles.attachmentsList}>
          {props.attachments.map(att => (
            <li key={att.id}>
              {att.name}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

export const DetailView = (props: { toDoId: string }) => {
  const { setActiveView } = React.useContext(NavigationContext);
  const { data } = useToDoQuery({
    variables: { id: props.toDoId },
  });
  const todo = data?.todo;

  return (
    <Section>
      <SubHeader>Details</SubHeader>
      {todo && (
        <>
          <ToDoEdit todo={todo} />
          <AttachmentsList attachments={todo.attachments || []} />
        </>
      )}
      <ButtonRow>
        <button onClick={() => setActiveView('ListView')}>back</button>
      </ButtonRow>
    </Section>
  );
};

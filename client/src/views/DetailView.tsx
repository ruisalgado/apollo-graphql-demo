import React from "react";
import { useToDoQuery } from "../generated/graphql";
import { NavigationContext } from "../NavigationContext";

export const DetailView = (props: { toDoId: string }) => {
  const { setActiveView } = React.useContext(NavigationContext);
  const { data } = useToDoQuery({
    variables: { id: props.toDoId },
  });

  const todo = data?.todo;
  const steps = todo?.steps || [];

  return (
    <>
      <h1>DetailView</h1>
      <p>title: {todo?.title}</p>
      <p>body: {todo?.body}</p>
      <p>status: {todo?.status}</p>
      <h2>Steps</h2>
      {steps.map(step => (
        <p key={step.id}>{step.title}</p>
      ))}
      <button onClick={() => setActiveView('ListView')}>back</button>
    </>
  );
};

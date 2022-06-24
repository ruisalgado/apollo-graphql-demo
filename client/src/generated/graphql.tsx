import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type EditToDoChanges = {
  body?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addToDoStep: Step;
  closeStep: Step;
  closeToDo: ToDo;
  createToDo: ToDo;
  editToDo: ToDo;
  openStep: Step;
  openToDo: ToDo;
  sortToDos: Array<ToDo>;
};


export type MutationAddToDoStepArgs = {
  title: Scalars['String'];
  toDo: Scalars['ID'];
};


export type MutationCloseStepArgs = {
  id: Scalars['ID'];
};


export type MutationCloseToDoArgs = {
  id: Scalars['ID'];
};


export type MutationCreateToDoArgs = {
  title: Scalars['String'];
};


export type MutationEditToDoArgs = {
  changes: EditToDoChanges;
  id: Scalars['ID'];
};


export type MutationOpenStepArgs = {
  id: Scalars['ID'];
};


export type MutationOpenToDoArgs = {
  id: Scalars['ID'];
};


export type MutationSortToDosArgs = {
  changes: Array<SortToDosInput>;
};

export type Query = {
  __typename?: 'Query';
  todo: ToDo;
  todos: Array<ToDo>;
};


export type QueryTodoArgs = {
  id: Scalars['ID'];
};


export type QueryTodosArgs = {
  statuses?: InputMaybe<Array<ToDoStatus>>;
};

export type SortToDosInput = {
  id: Scalars['ID'];
  order: Scalars['Int'];
};

export type Step = {
  __typename?: 'Step';
  completed: Scalars['Boolean'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ToDo = {
  __typename?: 'ToDo';
  body: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  status: ToDoStatus;
  steps: Array<Step>;
  stepsCompleted: Scalars['Int'];
  stepsCount: Scalars['Int'];
  title: Scalars['String'];
};

export enum ToDoStatus {
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Open = 'OPEN'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
};

export type AbbreviatedToDoFragment = { __typename?: 'ToDo', id: string, order: number, title: string, status: ToDoStatus, stepsCompleted: number, stepsCount: number };

export type DetailedToDoFragment = { __typename?: 'ToDo', body: string, id: string, order: number, title: string, status: ToDoStatus, stepsCompleted: number, stepsCount: number, steps: Array<{ __typename?: 'Step', id: string, title: string, completed: boolean }> };

export type VisibleToDosQueryVariables = Exact<{ [key: string]: never; }>;


export type VisibleToDosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'ToDo', id: string, order: number, title: string, status: ToDoStatus, stepsCompleted: number, stepsCount: number }> };

export type ToDoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ToDoQuery = { __typename?: 'Query', todo: { __typename?: 'ToDo', body: string, id: string, order: number, title: string, status: ToDoStatus, stepsCompleted: number, stepsCount: number, steps: Array<{ __typename?: 'Step', id: string, title: string, completed: boolean }> } };

export type AddToDoMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddToDoMutation = { __typename?: 'Mutation', createToDo: { __typename?: 'ToDo', body: string, id: string, order: number, title: string, status: ToDoStatus, stepsCompleted: number, stepsCount: number, steps: Array<{ __typename?: 'Step', id: string, title: string, completed: boolean }> } };

export const AbbreviatedToDoFragmentDoc = gql`
    fragment AbbreviatedToDo on ToDo {
  id
  order
  title
  status
  stepsCompleted
  stepsCount
}
    `;
export const DetailedToDoFragmentDoc = gql`
    fragment DetailedToDo on ToDo {
  ...AbbreviatedToDo
  body
  steps {
    id
    title
    completed
  }
}
    ${AbbreviatedToDoFragmentDoc}`;
export const VisibleToDosDocument = gql`
    query visibleToDos {
  todos(statuses: [OPEN, CLOSED]) {
    ...AbbreviatedToDo
  }
}
    ${AbbreviatedToDoFragmentDoc}`;

/**
 * __useVisibleToDosQuery__
 *
 * To run a query within a React component, call `useVisibleToDosQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisibleToDosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisibleToDosQuery({
 *   variables: {
 *   },
 * });
 */
export function useVisibleToDosQuery(baseOptions?: Apollo.QueryHookOptions<VisibleToDosQuery, VisibleToDosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisibleToDosQuery, VisibleToDosQueryVariables>(VisibleToDosDocument, options);
      }
export function useVisibleToDosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisibleToDosQuery, VisibleToDosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisibleToDosQuery, VisibleToDosQueryVariables>(VisibleToDosDocument, options);
        }
export type VisibleToDosQueryHookResult = ReturnType<typeof useVisibleToDosQuery>;
export type VisibleToDosLazyQueryHookResult = ReturnType<typeof useVisibleToDosLazyQuery>;
export type VisibleToDosQueryResult = Apollo.QueryResult<VisibleToDosQuery, VisibleToDosQueryVariables>;
export const ToDoDocument = gql`
    query toDo($id: ID!) {
  todo(id: $id) {
    ...DetailedToDo
  }
}
    ${DetailedToDoFragmentDoc}`;

/**
 * __useToDoQuery__
 *
 * To run a query within a React component, call `useToDoQuery` and pass it any options that fit your needs.
 * When your component renders, `useToDoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useToDoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToDoQuery(baseOptions: Apollo.QueryHookOptions<ToDoQuery, ToDoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ToDoQuery, ToDoQueryVariables>(ToDoDocument, options);
      }
export function useToDoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ToDoQuery, ToDoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ToDoQuery, ToDoQueryVariables>(ToDoDocument, options);
        }
export type ToDoQueryHookResult = ReturnType<typeof useToDoQuery>;
export type ToDoLazyQueryHookResult = ReturnType<typeof useToDoLazyQuery>;
export type ToDoQueryResult = Apollo.QueryResult<ToDoQuery, ToDoQueryVariables>;
export const AddToDoDocument = gql`
    mutation addToDo($title: String!) {
  createToDo(title: $title) {
    ...DetailedToDo
  }
}
    ${DetailedToDoFragmentDoc}`;
export type AddToDoMutationFn = Apollo.MutationFunction<AddToDoMutation, AddToDoMutationVariables>;

/**
 * __useAddToDoMutation__
 *
 * To run a mutation, you first call `useAddToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToDoMutation, { data, loading, error }] = useAddToDoMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useAddToDoMutation(baseOptions?: Apollo.MutationHookOptions<AddToDoMutation, AddToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToDoMutation, AddToDoMutationVariables>(AddToDoDocument, options);
      }
export type AddToDoMutationHookResult = ReturnType<typeof useAddToDoMutation>;
export type AddToDoMutationResult = Apollo.MutationResult<AddToDoMutation>;
export type AddToDoMutationOptions = Apollo.BaseMutationOptions<AddToDoMutation, AddToDoMutationVariables>;
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

export type Attachment = {
  __typename?: 'Attachment';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type EditToDoChanges = {
  body?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttachment: Attachment;
  closeToDo: ToDo;
  createToDo: ToDo;
  deleteToDo?: Maybe<Scalars['Boolean']>;
  editToDo: ToDo;
  openToDo: ToDo;
  removeAttachment: Scalars['Boolean'];
};


export type MutationAddAttachmentArgs = {
  name: Scalars['String'];
  toDo: Scalars['ID'];
};


export type MutationCloseToDoArgs = {
  id: Scalars['ID'];
};


export type MutationCreateToDoArgs = {
  title: Scalars['String'];
};


export type MutationDeleteToDoArgs = {
  id: Scalars['ID'];
};


export type MutationEditToDoArgs = {
  changes: EditToDoChanges;
  id: Scalars['ID'];
};


export type MutationOpenToDoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveAttachmentArgs = {
  id: Scalars['ID'];
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

export type ToDo = {
  __typename?: 'ToDo';
  attachmentCount: Scalars['Int'];
  attachments: Array<Attachment>;
  body: Scalars['String'];
  id: Scalars['ID'];
  status: ToDoStatus;
  title: Scalars['String'];
};

export enum ToDoStatus {
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Open = 'OPEN'
}

export type AbbreviatedToDoFragment = { __typename?: 'ToDo', id: string, title: string, status: ToDoStatus, attachmentCount: number };

export type DetailedToDoFragment = { __typename?: 'ToDo', body: string, id: string, title: string, status: ToDoStatus, attachmentCount: number, attachments: Array<{ __typename?: 'Attachment', id: string, name: string }> };

export type VisibleToDosQueryVariables = Exact<{ [key: string]: never; }>;


export type VisibleToDosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'ToDo', id: string, title: string, status: ToDoStatus, attachmentCount: number }> };

export type ToDoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ToDoQuery = { __typename?: 'Query', todo: { __typename?: 'ToDo', body: string, id: string, title: string, status: ToDoStatus, attachmentCount: number, attachments: Array<{ __typename?: 'Attachment', id: string, name: string }> } };

export type AddToDoMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type AddToDoMutation = { __typename?: 'Mutation', createToDo: { __typename?: 'ToDo', body: string, id: string, title: string, status: ToDoStatus, attachmentCount: number, attachments: Array<{ __typename?: 'Attachment', id: string, name: string }> } };

export type EditToDoMutationVariables = Exact<{
  id: Scalars['ID'];
  title: Scalars['String'];
  body: Scalars['String'];
}>;


export type EditToDoMutation = { __typename?: 'Mutation', editToDo: { __typename?: 'ToDo', body: string, id: string, title: string, status: ToDoStatus, attachmentCount: number, attachments: Array<{ __typename?: 'Attachment', id: string, name: string }> } };

export type CheckToDoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CheckToDoMutation = { __typename?: 'Mutation', closeToDo: { __typename?: 'ToDo', body: string, id: string, title: string, status: ToDoStatus, attachmentCount: number, attachments: Array<{ __typename?: 'Attachment', id: string, name: string }> } };

export type UncheckToDoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UncheckToDoMutation = { __typename?: 'Mutation', openToDo: { __typename?: 'ToDo', body: string, id: string, title: string, status: ToDoStatus, attachmentCount: number, attachments: Array<{ __typename?: 'Attachment', id: string, name: string }> } };

export type DeleteToDoMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteToDoMutation = { __typename?: 'Mutation', deleteToDo?: boolean | null };

export const AbbreviatedToDoFragmentDoc = gql`
    fragment AbbreviatedToDo on ToDo {
  id
  title
  status
  attachmentCount
}
    `;
export const DetailedToDoFragmentDoc = gql`
    fragment DetailedToDo on ToDo {
  ...AbbreviatedToDo
  body
  attachments {
    id
    name
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
export const EditToDoDocument = gql`
    mutation editToDo($id: ID!, $title: String!, $body: String!) {
  editToDo(id: $id, changes: {title: $title, body: $body}) {
    ...DetailedToDo
  }
}
    ${DetailedToDoFragmentDoc}`;
export type EditToDoMutationFn = Apollo.MutationFunction<EditToDoMutation, EditToDoMutationVariables>;

/**
 * __useEditToDoMutation__
 *
 * To run a mutation, you first call `useEditToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editToDoMutation, { data, loading, error }] = useEditToDoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useEditToDoMutation(baseOptions?: Apollo.MutationHookOptions<EditToDoMutation, EditToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditToDoMutation, EditToDoMutationVariables>(EditToDoDocument, options);
      }
export type EditToDoMutationHookResult = ReturnType<typeof useEditToDoMutation>;
export type EditToDoMutationResult = Apollo.MutationResult<EditToDoMutation>;
export type EditToDoMutationOptions = Apollo.BaseMutationOptions<EditToDoMutation, EditToDoMutationVariables>;
export const CheckToDoDocument = gql`
    mutation checkToDo($id: ID!) {
  closeToDo(id: $id) {
    ...DetailedToDo
  }
}
    ${DetailedToDoFragmentDoc}`;
export type CheckToDoMutationFn = Apollo.MutationFunction<CheckToDoMutation, CheckToDoMutationVariables>;

/**
 * __useCheckToDoMutation__
 *
 * To run a mutation, you first call `useCheckToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkToDoMutation, { data, loading, error }] = useCheckToDoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCheckToDoMutation(baseOptions?: Apollo.MutationHookOptions<CheckToDoMutation, CheckToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckToDoMutation, CheckToDoMutationVariables>(CheckToDoDocument, options);
      }
export type CheckToDoMutationHookResult = ReturnType<typeof useCheckToDoMutation>;
export type CheckToDoMutationResult = Apollo.MutationResult<CheckToDoMutation>;
export type CheckToDoMutationOptions = Apollo.BaseMutationOptions<CheckToDoMutation, CheckToDoMutationVariables>;
export const UncheckToDoDocument = gql`
    mutation uncheckToDo($id: ID!) {
  openToDo(id: $id) {
    ...DetailedToDo
  }
}
    ${DetailedToDoFragmentDoc}`;
export type UncheckToDoMutationFn = Apollo.MutationFunction<UncheckToDoMutation, UncheckToDoMutationVariables>;

/**
 * __useUncheckToDoMutation__
 *
 * To run a mutation, you first call `useUncheckToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUncheckToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uncheckToDoMutation, { data, loading, error }] = useUncheckToDoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUncheckToDoMutation(baseOptions?: Apollo.MutationHookOptions<UncheckToDoMutation, UncheckToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UncheckToDoMutation, UncheckToDoMutationVariables>(UncheckToDoDocument, options);
      }
export type UncheckToDoMutationHookResult = ReturnType<typeof useUncheckToDoMutation>;
export type UncheckToDoMutationResult = Apollo.MutationResult<UncheckToDoMutation>;
export type UncheckToDoMutationOptions = Apollo.BaseMutationOptions<UncheckToDoMutation, UncheckToDoMutationVariables>;
export const DeleteToDoDocument = gql`
    mutation deleteToDo($id: ID!) {
  deleteToDo(id: $id)
}
    `;
export type DeleteToDoMutationFn = Apollo.MutationFunction<DeleteToDoMutation, DeleteToDoMutationVariables>;

/**
 * __useDeleteToDoMutation__
 *
 * To run a mutation, you first call `useDeleteToDoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteToDoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteToDoMutation, { data, loading, error }] = useDeleteToDoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteToDoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteToDoMutation, DeleteToDoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteToDoMutation, DeleteToDoMutationVariables>(DeleteToDoDocument, options);
      }
export type DeleteToDoMutationHookResult = ReturnType<typeof useDeleteToDoMutation>;
export type DeleteToDoMutationResult = Apollo.MutationResult<DeleteToDoMutation>;
export type DeleteToDoMutationOptions = Apollo.BaseMutationOptions<DeleteToDoMutation, DeleteToDoMutationVariables>;
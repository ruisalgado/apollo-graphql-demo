import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GetAllUsersDocument, useGetAllUsersQuery, useUpdateUserMutation } from './generated/graphql';

const UsersList = () => {
  const { loading, data, error } = useGetAllUsersQuery({
    fetchPolicy: 'cache-first', // the default
  });

  if (loading) return <h1>loading</h1>;
  if (error) return <h1>Error {JSON.stringify(error)}</h1>;

  return (
      <>
          <h1>Users:</h1>
          <ul>
              {data?.getUsers.map((user, idx) => (
                  <li key={user.name + idx}>{user.name}</li>
              ))}
          </ul>
      </>
  );
};

const UserEdit = () => {
  const [formData, setFormData] = React.useState({
    id: "",
    name: "",
    email: "",
  });

  const updateUserInput = {
    id: Number.parseInt(formData.id),
    name: formData.name,
    email: formData.email,
  };

  const [updateUser, { loading, data, error }] = useUpdateUserMutation({
    variables: updateUserInput,
    // refetchQueries: [GetAllUsersDocument]
    optimisticResponse: {
      updateUser: {
        ...updateUserInput,
        __typename: "User",
      }
    }
  });

  console.log({ loading, data, error });

  return (
      <>
          <h1>Edit user</h1>
          <form onSubmit={e => {
            e.preventDefault();
            updateUser();
          }}>
              <label>
                  id:
                  <input name="id" type="number" required value={formData?.id} onChange={e => setFormData({ ...formData, id: e.target.value })}></input>
              </label>
              <label>
                  name:
                  <input name="name" type="text" required value={formData?.name} onChange={e => setFormData({ ...formData, name: e.target.value })}></input>
              </label>
              <label>
                  email:
                  <input name="email" type="email" required value={formData?.email} onChange={e => setFormData({ ...formData, email: e.target.value })}></input>
              </label>
              <input type="submit" />
          </form>
          {error && <p>{error.message}</p>}
      </>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <UsersList />
      <UserEdit />
    </div>
  );
}

export default App;

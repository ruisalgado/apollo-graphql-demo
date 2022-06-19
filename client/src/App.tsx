import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useGetAllUsersQuery } from './generated/graphql';

const UsersList = () => {
  const { loading, data, error } = useGetAllUsersQuery();

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
    </div>
  );
}

export default App;

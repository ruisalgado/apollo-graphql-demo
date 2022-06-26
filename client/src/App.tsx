import React from 'react';
import { AppContainer } from './components/Containers';
import { NavigationContext } from './NavigationContext';

function App() {
  const { renderActiveView } = React.useContext(NavigationContext);
  return (
    <AppContainer>{renderActiveView()}</AppContainer>
  );
}

export default App;

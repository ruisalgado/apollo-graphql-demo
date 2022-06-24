import React from 'react';
import { NavigationContext } from './NavigationContext';

function App() {
  const { renderActiveView } = React.useContext(NavigationContext);
  return <>{renderActiveView()}</>;
}

export default App;

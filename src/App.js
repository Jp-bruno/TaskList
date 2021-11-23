import List from "./components/sideList/list";
import TaskDisplay from "./components/display/taskDisplay";
import { useState, useContext } from 'react';
import ListContextProvider, { listContext } from './context/listContext';
import './globalCss.css';
import './css/listComponents.css';
import './css/taskDisplayComponents.css';

function App() {
  const context = useContext(listContext)

  return (
    <ListContextProvider>
      <div className="App">
        <div id='wrapper'>
          <div id='listWrapper'>
            <List />
          </div>
          <TaskDisplay />
        </div>
      </div>
    </ListContextProvider>
  );
}

export default App;

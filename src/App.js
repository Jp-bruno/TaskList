/* eslint-disable no-unused-vars */
import List from "./components/sideList/list";
import TaskDisplay from "./components/display/taskDisplay";
import ListContextProvider from './context/listContext';
import './globalCss.css';
import './css/listComponents.css';
import './css/taskDisplayComponents.css';

function App() {

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


import { Routes , Route } from 'react-router-dom'

import Join from './components/join';
import Chat from './components/Chat';
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" Component={Join} />
        <Route path="/chat" Component={Chat}/>
      </Routes>
    </div>
  );
}

export default App;

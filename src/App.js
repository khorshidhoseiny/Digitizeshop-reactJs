import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage/>
      </Router>
      
    </div>
  );
}

export default App;

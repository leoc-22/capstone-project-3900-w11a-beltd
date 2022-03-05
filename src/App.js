import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import LandingPage from './Pages/LandingPage'
import login from './Pages/login'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/login" component={login}></Route>
      </Switch>
    </Router>
  );
}

export default App;

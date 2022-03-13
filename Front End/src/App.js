import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import LandingPage from './Pages/LandingPage'
import LogInPage from './Pages/login'
import SignUpPage from './Pages/signup'
import ResetPassword from './Pages/resetPassword';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/login" component={LogInPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/signup" component={SignUpPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/reset" component={ResetPassword}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import LandingPage from "./Pages/LandingPage";
import login from "./Pages/login";
import signup from "./Pages/signup";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/login" component={login}></Route>
      </Switch>
      <Switch>
        <Route exact path="/signup" component={signup}></Route>
      </Switch>
      <Switch>
        <Route exact path="/HomePage" component={HomePage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/SearchPage" component={SearchPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;

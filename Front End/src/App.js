import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LogInPage from "./Pages/login";
import SignUpPage from "./Pages/signup";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import ResetPasswordPage from "./Pages/resetPassword";

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
        <Route exact path="/reset" component={ResetPasswordPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/home" component={HomePage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/SearchPage" component={SearchPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LogInPage from "./Pages/LogInPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import SearchPage from "./Pages/SearchPage";
import ResetPasswordPage from "./Pages/resetPassword";
import UpdatePasswordPage from "./Pages/UpdatePassword";
import UserSettingsPage from "./Pages/userSettings";
import UserProfilePage from "./Pages/userProfile";
import GoalSettingPage from "./Pages/goalSetting";
import BookProfilePage from "./Pages/bookProfile";
import UnAuthedBookProfile from "./Pages/UnAuthedBookProfile";
import UnAthuedCollectionDetailPage from "./Pages/UnAthuedCollectionDetailPage";

import ForgetPasswordPage from "./Pages/forgetPassword";
import CollectionPage from "./Pages/CollectionPage";
import CollectionDetailPage from "./Pages/CollectionDetailPage";
import RecommendationsPage from "./Pages/Recommendations";
import LeaderBoard from "./Pages/LeaderBoard";
import PublicProfiles from "./Pages/PublicProfiles";

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
        <Route
          exact
          path="/update-password"
          component={UpdatePasswordPage}
        ></Route>
      </Switch>
      <Switch>
        <Route exact path="/user-settings" component={UserSettingsPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/user-profile" component={UserProfilePage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/book-profile" component={BookProfilePage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/Public-book-profile" component={UnAuthedBookProfile}></Route>
      </Switch>
      <Switch>
        <Route exact path="/reading-goal" component={GoalSettingPage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/home" component={HomePage}></Route>
      </Switch>
      <Switch>
        <Route exact path="/search" component={SearchPage}></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/recommendations"
          component={RecommendationsPage}
        ></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/forget-password/:id/:token"
          component={ForgetPasswordPage}
        ></Route>
      </Switch>
      <Switch>
        <Route exact path="/collections" component={CollectionPage}></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/collection-detail"
          component={CollectionDetailPage}
        ></Route>
      </Switch>
      <Switch>
        <Route
          exact
          path="/un-Authed-collection-detail"
          component={UnAthuedCollectionDetailPage}
        ></Route>
      </Switch>

      <Switch>
        <Route exact path="/LeaderBoard" component={LeaderBoard}></Route>
      </Switch>
      <Switch>
        <Route exact path="/PublicProfiles" component={PublicProfiles}></Route>
      </Switch>
    </Router>
  );
}

export default App;

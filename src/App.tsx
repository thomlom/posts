import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Home from "./Home";
import Signin from "./Signin";
import Signup from "./Signup";
import CreatePost from "./CreatePost";
import PostDetail from "./PostDetail";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

import { Container } from "./App.styles";

function App() {
  return (
    <Container>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/create" component={CreatePost} />
          <Route path="/post/:postId" component={PostDetail} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

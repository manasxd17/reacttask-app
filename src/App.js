import React from 'react';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import ArticleMain from './components/ArticleMain';
import Protected from './Protected';
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path = "/">
            <Signup></Signup>
          </Route>
          <Route path = "/login">
            <Login></Login>
          </Route>
          <Route path = "/articles">
            <Protected Cmp = {ArticleMain}></Protected>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

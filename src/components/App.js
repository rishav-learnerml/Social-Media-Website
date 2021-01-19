import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import { Navbar, Home, Page404, Login, Signup, Settings } from './index';
import { fetchPosts } from '../actions/posts';
import { authenticateUser } from '../actions/auth';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';
import UserProfile from './UserProfile';
import { fetchUserFriends } from '../actions/friends';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwt_decode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact={true}
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    posts={posts}
                    friends={friends}
                    isLoggedin={auth.isLoggedin}
                  />
                );
              }}
            />
            <Route
              exact={true}
              path="/login"
              render={(props) => {
                return <Login {...props} />;
              }}
            />
            <Route exact={true} path="/signup" component={Signup} />
            <PrivateRoute
              path="/settings"
              component={Settings}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              path="/user/:userId"
              component={UserProfile}
              isLoggedin={auth.isLoggedin}
            />
            <Route exact={true} component={Page404} />
          </Switch>
        </div>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}
App.propTypes = {
  posts: propTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);

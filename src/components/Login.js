import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, clearAuthState } from '../actions/auth';

class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();
    this.state = {
      email: '',
      password: '',
    };
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log("email: ",this.emailInputRef);
    // console.log("password: ",this.passwordInputRef);
    console.log('Email: ', this.state.email, 'Password: ', this.state.password);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;
    // const { pathname } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (isLoggedin) {
      return <Redirect to={from} />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            value={this.state.email}
            required
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Password"
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
            value={this.state.password}
            required
          />
        </div>
        <div className="field">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging In...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Log In
            </button>
          )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);

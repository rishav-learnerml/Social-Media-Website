import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';

class Navbar extends React.Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };
  render() {
    const { auth } = this.props;
    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://designmodo.com/wp-content/uploads/2011/08/230.jpg"
              width="50px"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://www.flaticon.com/svg/static/icons/svg/1086/1086933.svg"
            alt="search-icon"
          />
          <input placeholder="Search" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"
                  alt="user-avatar"
                />
                <span>Rishav Chatterjee</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"
                  alt="user-avatar"
                />
                <span>Elon Mask</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-nav">
          {auth.isLoggedin && (
            <div className="user">
              <Link to='/settings'>
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"
                alt="user-avatar"
                id="user-dp"
              />
              </Link>
              <span>{auth.user.name}</span>
            </div>
          )}

          <div className="nav-links">
            <ul>
              {!auth.isLoggedin && (
                <li>
                  <Link to="/login">Login</Link>
                </li>
              )}
              {auth.isLoggedin && <li onClick={this.logOut}>Logout</li>}
              {!auth.isLoggedin && (
                <li>
                  <Link to="/signup">Register</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Navbar);

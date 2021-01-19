import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend, removeFriend } from '../actions/friends';
import { fetchUserProfile } from '../actions/profile';
import { ApiUrls } from '../helpers/urls';
import { getAuthTokenFromLocalStorage } from '../helpers/utils';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            success: null,
            error: null,
            successMessage: null
        }
    }
    
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      //dispatch an action to fetch the user
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }

  checkIfUserIsAFriend = () => {
    const { match, friends } = this.props;
    const userId = match.params.userId;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }
    return false;
  };

  handleAddFriendClick = async () =>{
      const userId = this.props.match.params.userId;
      const url = ApiUrls.addFriend(userId);

      const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`,
          },
      };
      const response = await fetch(url,options);
      const data = await response.json();
      if(data.success){
          this.setState({
              success:true,
              successMessage: 'Added Friend Succesfully!!'
          });

          this.props.dispatch(addFriend(data.data.friendship));
      }else{
        this.setState({
            success:null,
            error: data.message
        });
      }
  }
  handleRemoveFriendClick = async () =>{
    const userId = this.props.match.params.userId;
    const url = ApiUrls.removeFriend(userId);

    const extra = {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${getAuthTokenFromLocalStorage()}`,
        },
    };
    const response = await fetch(url,extra);
    const data = await response.json();
    if(data.success){
        this.setState({
            success:true,
            successMessage: 'Removed Friend Succesfully!!'
        });

        this.props.dispatch(removeFriend(userId));
    }else{
      this.setState({
          success:null,
          error: data.message
      });
    }
}
  render() {
    const isUserAFriend = this.checkIfUserIsAFriend();
    const {error,success,successMessage} = this.state;
    const {
      match: { params },
      profile,
    } = this.props;
    const user = profile.user;
    if (profile.inProgress) {
      return <h1>loading...</h1>;
    }
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"
            alt="user-avatar"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>
        <div className="btn-grp">
          {!isUserAFriend ? (
            <button className="button save-btn" onClick={this.handleAddFriendClick}>Add Friend</button>
          ) : (
            <button className="button save-btn" onClick={this.handleRemoveFriendClick}>Remove Friend</button>
          )}
          {success && <div className="alert success-dailog">{successMessage}</div>}
          {error && <div className="alert error-dailog">{error}</div>}
        </div>
      </div>
    );
  }
}
function matchStateToProps({ profile, friends }) {
  return {
    profile,
    friends
  };
}
export default connect(matchStateToProps)(UserProfile);

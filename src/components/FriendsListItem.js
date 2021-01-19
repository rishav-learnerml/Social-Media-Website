import React from 'react';
import { Link } from 'react-router-dom';

function FriendsListItem(props) {
  return (
    <div>
      <Link className="friends-item" to={`user/${props.friend._id}`}>
        <div className="friends-img">
          <img src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg" alt="user-pic" />
        </div>
        <div className="friends-name">{props.friend.name}</div>
      </Link>
    </div>
  );
}

export default FriendsListItem;
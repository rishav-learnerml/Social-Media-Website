import React, { Component } from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { CreatePost } from '.';
export default class PostsList extends Component {
    render() {
        const {posts} = this.props;
        return (
            <div className="posts-list">
              <CreatePost />
            {posts.map((post) => (
              <div className="post-wrapper" key={post._id}>
                <div className="post-header">
                  <div className="post-avatar">
                    <Link to={`/user/${post.user._id}`}>
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/3135/3135715.svg"
                      alt="user-pic"
                    />
                    </Link>
                  <div>
                    <span className="post-author">{post.user.name}</span>
                    <span className="post-time"> a minute ago</span>
                  </div>
                  </div>
                </div>
                <div className="post-content">{post.content}</div>
                <div className="post-actions">
                  <div className="post-like">
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/1000/1000621.svg"
                      alt="like-icon"
                    />
                    <span>{post.likes.length}</span>
                  </div>
                  <div className="post-comments-icon">
                    <img
                      src="https://www.flaticon.com/svg/static/icons/svg/2462/2462719.svg"
                      alt="comment-icon"
                    />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
                <div className="post-comment-box">
                  <input placeholder="comment on this post" />
                </div>
                <div className="post-comments-list">
                  <div className="post-comments-item">
                    <div className="post-comment-header">
                      <span className="post-comment-author">Bill</span>
                      <span className="post-comment-time">a minute ago</span>
                      <span className="post-comment-likes">30</span>
                    </div>
                    <div className="post-comment-content">Random comment</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
    }
}

PostsList.propTypes={
    posts: propTypes.array.isRequired
}

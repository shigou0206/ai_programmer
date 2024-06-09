// UserList.js
import React from 'react';
import './UserList.css';
import { getSignedUrl } from './aws-config';

const UserList = ({ users, onLike, onDislike, isLoading, error }) => {
  const handleOpenFile = async (key) => {
    const url = getSignedUrl(key);
    window.open(url, '_blank');
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOpenFile(user.s3Key); // 假设用户对象中有 s3Key 属性
              }}
            >
              {user.login}
            </a>
          </div>
          <div>
            <button
              className={`like-button ${user.liked ? 'liked' : ''}`}
              onClick={() => onLike(user.id)}
            >
              👍
            </button>
            <button
              className={`dislike-button ${user.disliked ? 'disliked' : ''}`}
              onClick={() => onDislike(user.id)}
            >
              👎
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;

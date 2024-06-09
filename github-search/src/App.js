// App.js
import React, { useReducer, useEffect } from 'react';
import { fetchGitHubUsers } from './api';
import { initialState, reducer, actionTypes } from './reducer';
import SearchBar from './SearchBar';
import UserList from './UserList';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchUsers = async () => {
      if (state.query) {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        try {
          const users = await fetchGitHubUsers(state.query);
          // 假设你可以从其他地方获取 s3Key，并添加到用户对象中
          const usersWithS3Keys = users.map(user => ({
            ...user,
            s3Key: `files/${user.login}.pdf`, // 示例 key，可以根据实际情况调整
          }));
          dispatch({ type: actionTypes.SET_USERS, payload: usersWithS3Keys });
        } catch (error) {
          dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
        }
      }
    };
    fetchUsers();
  }, [state.query]);

  const handleSearch = (query) => {
    dispatch({ type: actionTypes.SET_QUERY, payload: query });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= Math.ceil(state.users.length / state.usersPerPage)) {
      dispatch({ type: actionTypes.SET_PAGE, payload: page });
    }
  };

  const handleLike = (id) => {
    dispatch({ type: actionTypes.TOGGLE_LIKE, payload: id });
  };

  const handleDislike = (id) => {
    dispatch({ type: actionTypes.TOGGLE_DISLIKE, payload: id });
  };

  const indexOfLastUser = state.currentPage * state.usersPerPage;
  const indexOfFirstUser = indexOfLastUser - state.usersPerPage;
  const currentUsers = state.users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="app">
      <div className="search-container">
        <h1>GITHUB SEARCH</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <UserList
        users={currentUsers}
        onLike={handleLike}
        onDislike={handleDislike}
        isLoading={state.isLoading}
        error={state.error}
      />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(state.currentPage - 1)}
          disabled={state.currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: Math.ceil(state.users.length / state.usersPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={state.currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(state.currentPage + 1)}
          disabled={state.currentPage === Math.ceil(state.users.length / state.usersPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;

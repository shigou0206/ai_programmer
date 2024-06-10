import React, { useReducer } from 'react';
import { fetchGitHubUsers, ApiResponse } from './api/github';
import { initialState, reducer, actionTypes } from './reducers';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './App.css';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSearch = async (query: string) => {
    dispatch({ type: actionTypes.SET_QUERY, payload: query });
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    try {
      const response: ApiResponse = await fetchGitHubUsers(query);
      dispatch({ type: actionTypes.SET_RESULTS, payload: response });
    } catch (error: any) {  // 这里将 error 类型断言为 any
      dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
    }
  };

  const handleToggleLike = (id: number) => {
    dispatch({ type: actionTypes.TOGGLE_LIKE, payload: id });
  };

  const handlePageChange = (page: number) => {
    dispatch({ type: actionTypes.SET_PAGE, payload: page });
  };

  return (
    <div className="app">
      <div className="header">
        <h1>SBI FULL SEARCH</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <UserList
        items={state.items}
        onToggleLike={handleToggleLike}
        isLoading={state.isLoading}
        error={state.error}
        currentPage={state.currentPage}
        itemsPerPage={state.itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;

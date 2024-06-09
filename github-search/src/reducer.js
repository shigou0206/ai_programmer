// reducer.js
export const initialState = {
  users: [],
  query: '',
  currentPage: 1,
  usersPerPage: 5,
  isLoading: false,
  error: null,
};

export const actionTypes = {
  SET_USERS: 'SET_USERS',
  SET_QUERY: 'SET_QUERY',
  SET_PAGE: 'SET_PAGE',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  TOGGLE_DISLIKE: 'TOGGLE_DISLIKE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload.map(user => ({
          ...user,
          liked: false,
          disliked: false,
        })),
        isLoading: false,
        error: null,
      };
    case actionTypes.SET_QUERY:
      return { ...state, query: action.payload, currentPage: 1 };
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    case actionTypes.TOGGLE_LIKE:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload
            ? { ...user, liked: !user.liked, disliked: user.liked ? user.disliked : false }
            : user
        ),
      };
    case actionTypes.TOGGLE_DISLIKE:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload
            ? { ...user, disliked: !user.disliked, liked: user.disliked ? user.liked : false }
            : user
        ),
      };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
};

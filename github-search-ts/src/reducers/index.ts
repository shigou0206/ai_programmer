import { GitHubUser, ApiResponse } from '../api/github';

interface State {
  queryId: string;
  items: GitHubUser[];
  query: string;
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

interface Action {
  type: string;
  payload?: any;
}

export const initialState: State = {
  queryId: '',
  items: [],
  query: '',
  isLoading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 5,
};

export const actionTypes = {
  SET_RESULTS: 'SET_RESULTS',
  SET_QUERY: 'SET_QUERY',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  SET_PAGE: 'SET_PAGE',
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.SET_RESULTS:
      return {
        ...state,
        queryId: action.payload.queryId,
        items: action.payload.items,
        isLoading: false,
        error: null,
        currentPage: 1,
      };
    case actionTypes.SET_QUERY:
      return { ...state, query: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case actionTypes.TOGGLE_LIKE:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, liked: !item.liked } : item
        ),
      };
    case actionTypes.SET_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

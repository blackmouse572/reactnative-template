import { useCallback, useEffect, useReducer } from 'react';
const FETCH_TODO_ACTION = {
  FETCH_TODO_REQUEST: 'FETCH_TODO_REQUEST',
  FETCH_TODO_SUCCESS: 'FETCH_TODO_SUCCESS',
  FETCH_TODO_FAILURE: 'FETCH_TODO_FAILURE',
  REFETCH_TODO: 'REFETCH_TODO',
};
function fetchReducer(state, action) {
  switch (action.type) {
    case FETCH_TODO_ACTION.FETCH_TODO_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_TODO_ACTION.FETCH_TODO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        todos: action.payload,
        error: '',
      };
    case FETCH_TODO_ACTION.FETCH_TODO_FAILURE:
      return {
        ...state,
        isLoading: false,
        todos: [],
        error: action.payload,
      };
    case FETCH_TODO_ACTION.REFETCH_TODO:
      return {
        ...state,
        refetchIndex: state.refetchIndex + 1,
      };
    default:
      return state;
  }
}
const initialState = {
  isLoading: false,
  todos: [],
  error: '',
  refetchIndex: 0,
};
export function useFetchTodo() {
  const [{ refetchIndex, ...rest }, dispatch] = useReducer(fetchReducer, initialState);
  const refetch = useCallback(() => {
    dispatch({ type: FETCH_TODO_ACTION.REFETCH_TODO });
  }, []);
  const fetchApi = useCallback(() => {
    const url = 'https://jsonplaceholder.typicode.com/todos';

    dispatch({ type: FETCH_TODO_ACTION.FETCH_TODO_REQUEST });

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: FETCH_TODO_ACTION.FETCH_TODO_SUCCESS,
          payload: json,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_TODO_ACTION.FETCH_TODO_FAILURE,
          payload: error.message,
        });
      });
  }, []);
  useEffect(() => {
    fetchApi();
  }, [fetchApi, refetchIndex]);

  return { ...rest, refetch };
}

export default useFetchTodo;
export { FETCH_TODO_ACTION };

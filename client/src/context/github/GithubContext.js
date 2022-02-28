import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //* INITIALSTATE SET TO AN OBJECT
  const intitialState = {
    users: [],
    user: {},
    loading: false
  };
  //*USEREDUCER HOOK
  const [state, dispatch] = useReducer(githubReducer, intitialState);

  //* ASYNC FUNCTION TO FETCH REQUEST TO SEARCH USERS RESULTS
  const searchUsers = async (text) => {
    //   set loading sets to true via reducer and the GET_USERS sets it back to false
    setLoading();

    // for query params to search text values
    const params = new URLSearchParams({
      q: text
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    // There is an items array in the json object returned, thats why it's destructured here
    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items
    });
  };

  //* ASYNC FUNCTION TO FETCH REQUEST TO GET A SINGLE USER
  const getUser = async (login) => {
    //   set loading sets to true via reducer and the GET_USERS sets it back to false
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    // redirect if not an endpoint and get the 404, else return the data
    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      dispatch({
        type: 'GET_USER',
        payload: data
      });
    }
  };

  //   *CLEAR THE USERS FROM THE STATE
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS'
    });
  };
  // * SET LOADING
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING'
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser
      }}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;

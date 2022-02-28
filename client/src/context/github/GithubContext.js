import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //* INITIALSTATE SET TO AN OBJECT
  const intitialState = {
    users: [],
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

  // * SET LOADING
  const setLoading = () =>
    dispatch({
      type: 'SET_LOADING'
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers
      }}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;

import { createContext, useReducer } from 'react';
import { createRoutesFromChildren } from 'react-router-dom';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  //* INITIALSTATE SET TO AN OBJECT
  const intitialState = {
    users: [],
    user: {},
    repos:[],
    loading: false
  };
  //*USEREDUCER HOOK
  const [state, dispatch] = useReducer(githubReducer, intitialState);

 

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


  //* ASYNC FUNCTION TO FETCh USER REPOS
  const getUserRepos = async (login) => {
    //   set loading sets to true via reducer and the GET_REPOS sets it back to false
    setLoading();
  // for query params to search text values
  const params = new URLSearchParams({
    sort: 'created',
    per_page:10,
  });

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });

    const data= await response.json();
    dispatch({
      type: 'GET_REPOS',
      payload: data
    });
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
        // users: state.users,
        // user: state.user,
        // repos:state.repos,
        // loading: state.loading,
        // spread state instead
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos
      }}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;

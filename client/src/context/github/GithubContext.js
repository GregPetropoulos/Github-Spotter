import { createContext, useReducer } from 'react';
import { createRoutesFromChildren } from 'react-router-dom';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

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
      }}>
      {children}
    </GithubContext.Provider>
  );
};
export default GithubContext;

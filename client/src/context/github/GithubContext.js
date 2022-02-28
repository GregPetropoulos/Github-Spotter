import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';


const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {

//* INITIALSTATE SET TO AN OBJECT
    const intitialState={
        users:[],
        // Always use true by default to avoid less code
        loading:true
    }
    //*USEREDUCER HOOK 
    const [state, dispatch]= useReducer(githubReducer, intitialState)

    // INITIALSTATE AND USEREDUCER REPLACE THE USESTATE
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

  // async function fetch request
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
   dispatch({
       type:'GET_USERS',
       payload:data,
   })
  };
  return (
    <GithubContext.Provider
      value={{
        users:state.users,
        loading:state.loading,
        fetchUsers
      }}>{children}</GithubContext.Provider>
  );
};
export default GithubContext
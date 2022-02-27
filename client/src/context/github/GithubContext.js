import { createContext, useState } from 'react';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  // Always use true by default to avoid less code
  const [loading, setLoading] = useState(true);

  // async function fetch request
  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
    // console.log(data);
  };
  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers
      }}>{children}</GithubContext.Provider>
  );
};
export default GithubContext
import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

// Bring in axios and removed fetch
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` }
});

//* ASYNC FUNCTION TO FETCH REQUEST TO SEARCH USERS RESULTS
export const searchUsers = async (text) => {
  //Need `export const` to call function from component instead of the whole component
  //setLoading moved to a separate component
  // for query params to search text values
  const params = new URLSearchParams({
    q: text
  });
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

// GET USER AND REPOS ASYNC/AWAIT -- COMBINED TWO API CALLS
export const getUserAndRepos = async (login) => {
  // Use the Promise.All to make multiple request in one array
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ]);
  // returning an object
  return { user: user.data, repos: repos.data };
};

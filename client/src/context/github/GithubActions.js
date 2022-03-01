const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

//* ASYNC FUNCTION TO FETCH REQUEST TO SEARCH USERS RESULTS
export const searchUsers = async (text) => {
  //Need `export const` to call function from component instead of the whole component
  //setLoading moved to a separate component

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

  // dispatch({
  //   type: 'GET_USERS',
  //   payload: items
  // });
  // refactored to just a return
  return items;
};

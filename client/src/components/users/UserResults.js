import { useEffect, useState } from 'react';
import { Spinner } from '../layouts/Spinner';
import UserItem from './UserItem';

const UserResults = () => {
  const [users, setUsers] = useState([]);
  // Always use true by default to avoid less code
  const [loading, setLoading] = useState(true);

  // On load call users
  useEffect(() => {
    fetchUsers();
  }, []);
  // async function fetch request
  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
      }
    });
    const data = await response.json();
    setUsers(data);
    setLoading(false);
    console.log(data);
  };
  // console.log('users:', users);
  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
        {users.map((user) => (
<UserItem key={user.id} user={user}/>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
};

export default UserResults;

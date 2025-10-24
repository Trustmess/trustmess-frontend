import '/src/scss/_dev_pages/_dev_page.scss';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { ContactCard } from '/src/components/ContactCard';
import { Button } from '/src/components/Button';

import { getUserByName, getUserById, getUsers } from '/src/api/requests';

export const DevPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsers();
        setUsers(allUsers);
      } catch (error) {
        console.log('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='dev_page_container'>
      <h1>DEV PAGE</h1>
      <div className='user_list'>
        {users.map((user) => (
          <ContactCard key={user.id} userName={user.username} />
        ))}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import ListMember from './ListMember';
import {fetchData} from '../../Api/api';

const DisplayUsers = ()=>{

  const [users, setUsers] = useState([]);

  useEffect(() => { 
    //await for fetchdata() to send response.
    const fetchUsers = async () => {
      try {
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        console.error('Error in DisplayUsers:', error.message);
      }
    };

    fetchUsers();
  }, []);

    return (
        <div>
        <ListMember UserList={users}  />
        </div>
    );
    }
  export default DisplayUsers;
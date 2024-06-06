import React from 'react'
import 'aos/dist/aos.css';
import './index.scss';
import Task from '../../Task';
import YourTaskpagecard from './YourTaskpagecard';
import { useState,useEffect } from 'react';
export default function YourTaskpage() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Task.getAllUsers();
        const usersArray = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        setUsers(usersArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await Task.deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error occurred while deleting user');
    }
  };

  return (
    <div>
      <div className="your-project-container">
        <hr />
       {users.map((item,index)=>(<YourTaskpagecard  index = {index} item={item} handleDelete={handleDelete}/>))}
      </div>
    </div>
  )
}

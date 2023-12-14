// api.js
import axios from 'axios';

/*Function to Make a GET request on Given URL
  if request is ok 
  it will return the JSON object
  else

  throw Error
*/

export const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      throw error;
    }
  };


  

// Post user

export const createUser = async(payload) =>{

try {
                
  // Make the POST request API server
  const response =  await axios.post('http://localhost:3001/api/addMember', payload);

  // Check the response status
  if (response.status === 200) {
    // Successful response
    return true;
    
  } else {
    // Handle other response statuses if needed
    return false;
  }

} catch (error) {
  // Handle errors from the API request
  console.error('Error adding member:', error.message);
  return false;
}

};

//Delete user info

export const deleteUser = async(id) =>{
  try{
    const response =  await axios.delete(`http://localhost:3001/api/users/${id}`);
  // Check the response status
  if (response.status === 200) {
    // Successful response
    return true;

    
  } else {
    // Handle other response statuses if needed
    return false;
  }

} catch (error) {
  // Handle errors from the API request
  console.error('Delete  member failed:', error.message);
  return false;
}
  }


  //Edit user 

  export const editUser = async(id, payload) =>{

    try {
                    
      // Make the POST request to your Express server
      const response =  await axios.put(`http://localhost:3001/api/users/${id}`, payload);
    
      // Check the response status
      if (response.status === 200) {
        // Successful response
        return true;
        
      } else {
        // Handle other response statuses if needed
        return false;
      }
    
    } catch (error) {
      // Handle errors from the API request
      console.error('Error adding member:', error.message);
      return false;
    }
    
    };
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./AdminDashboard.css"

function EditUser({user, onClose}) {
 
  const [userData, setUserData] = useState({
    userId: user? user.userId : 0,
    userName: user? user.userName : "",
    userEmail: user? user.userEmail : "",
    userPassword: user? user.userPassword : "",
    userRole: user? user.userRols : "",
    userDepartment: user? user.userDepartment : "",
    userStatus: user? user.userStatus : "",
  })
    const navigate = useNavigate();

    const handleBack = () => {
        if (onClose) {
            onClose();
        } else {
            navigate(-1);
        }
    }
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }
 
    const handleDelete = async () => {
  
    try {
        const response = await axios.delete(`http://localhost:8080/api/users/${userData.userId}`);
        
        if (response.status === 204) {
            alert('User deleted successfully');
            if (onClose) {
                onClose();
            } else {
                navigate(-1);
            }
        }
    } catch (error) {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    alert('Unauthorized - Please log in again');
                    break;
                case 403:
                    alert('Forbidden - You do not have permission to delete this user');
                    break;
                case 404:
                    alert('User not found');
                    break;
                default:
                    alert('Error deleting user: ' + (error.response.data.message || 'Unknown error'));
            }
        } else {
            alert('Network error occurred while deleting user');
        }
        console.error('Delete error:', error);
    }
};
  const handleSubmit = async () => {
      try {
          const response = await axios.put(`http://localhost:8080/api/users/${userData.userId}`, userData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          // Implement update functionality
          console.log("Updating user with data:", userData)
          console.log(Response.status)
      
          if (response.status === 200) {
              console.log("User updated successfully:", response.data);
              alert("User updated successfully!")
          }
      } catch (error) {
          if (error.response) {
              console.error("Update failed", error.response.data.message || error.response.data);
              switch (error.response.status) {
                case 401:
                    console.error('Unauthorized - Invalid token');
                    break;
                case 403:
                    console.error('Forbidden - Insufficient permissions');
                    break;
                case 404:
                    console.error('User not found');
                    break;
                default:
                    console.error('Server error:', error.response.status);
              }
          } else if (error.request) {
              console.error("No response from server");
          } else {
              console.error("Request error", error.message)
          }
      }
  }

  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Edit User</h1>
        <button className="logout-button" onClick={handleBack}>Back</button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="userId">User ID</label>
          <input
            type="integer"
            id="userId"
            name="userId"
            placeholder="Enter / Scan User ID"
            value={userData.userId}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter User Name"
            value={userData.userName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            placeholder="Enter Email"
            value={userData.userEmail}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            placeholder="Enter 6 digit Password"
            value={userData.userPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select id="userRole" name="userRole" value={userData.userRole} onChange={handleChange}>
            <option value="" disabled>
              Select User Role
            </option>
                <option value="member">Library Member</option>
                <option value="staff">Staff</option>

          </select>
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="userDepartment"
            name="userDepartment"
            placeholder="Enter Department"
            value={userData.userDepartment}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select id="userStatus" name="userStatus" value={userData.userStatus} onChange={handleChange}>
            <option value="" disabled>
              Select User Status
            </option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="update-button">
            Update
                  </button>
                  
            <button type="button" className="delete-button" onClick={handleDelete}>
            Delete
          </button>
              </div>


      </form>
    </div>
  )
}

export default EditUser


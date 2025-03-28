import { useState, useEffect } from "react"
import EditUser from "./EditUser"
import axios from "axios";
import './AdminDashboard.css';
import { useNavigate } from "react-router-dom";
import AddUser from "./AddUser";

function ManageUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [view, setView] = useState("list");
    const [selectedUser, setSelectedUser] = useState(null)

  // Sample user data
//   const users1 = [
//     { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//     { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Librarian" },
//     { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Student" },
//     { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Faculty" },
//   ]
    const redirectToSignIn = () => {
        navigate('/Login')
    };
    useEffect(() => {
        axios.get("http://localhost:8080/api/users")
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleEdit = (user) => {
        console.log(`Editting ${user.userId}`);
        setSelectedUser(user);
        setView("edit");
    };

    const handleAddUser = () => {
        console.log("Register a new user")
        setSelectedUser(null)
        setView("add")
    };

    if (view === "edit") {
        return <EditUser user={selectedUser} onClose={() => {
            setView("list"); setSelectedUser(null)
    }
}/>;
    } else if (view === "add") {
        return <AddUser onClose={() => {
            setView("list"); setSelectedUser(null)
    }
}/>;
};


  return (
    <div className="content-area">
      <div className="header-container">
        <h1>Manage Users</h1>
        <button className="logout-button" onClick={redirectToSignIn}>Logout</button>
      </div>

      <div className="action-bar">
        <button className="add-button" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="users-section">
        <h2>Users</h2>
        <div className="user-list">
          {users.map((user) => (
            <div key={user.userId} className="user-item">
              <div className="user-info">
                <div className="user-name">{user.userName}</div>
                <div className="user-details">
                  {user.userEmail} • {user.userRole}
                </div>
              </div>
              <button className="edit-button" onClick={() => handleEdit(user)}>
                EDIT
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ManageUsers;

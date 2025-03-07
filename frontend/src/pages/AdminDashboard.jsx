import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'User1', transactionId: 'TXN123456', status: localStorage.getItem('transactionStatus') || 'Pending' },
    { id: 2, name: 'User2', transactionId: 'TXN789012', status: 'Pending' },
  ]);

  const handleApprove = (id) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: 'Approved' } : user
    );
    setUsers(updatedUsers);
    if (id === 1) localStorage.setItem('transactionStatus', 'Approved'); // Sync with User1
  };

  const handleReject = (id) => {
    const updatedUsers = users.map(user => 
      user.id === id ? { ...user, status: 'Rejected' } : user
    );
    setUsers(updatedUsers);
    if (id === 1) localStorage.setItem('transactionStatus', 'Rejected'); // Sync with User1
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Transaction ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.transactionId}</td>
                <td className={`status-${user.status.toLowerCase()}`}>{user.status}</td>
                <td>
                  <button 
                    onClick={() => handleApprove(user.id)} 
                    disabled={user.status !== 'Pending'}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleReject(user.id)} 
                    disabled={user.status !== 'Pending'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

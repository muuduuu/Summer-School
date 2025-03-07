import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [transactionId, setTransactionId] = useState('');
  const [status, setStatus] = useState(() => localStorage.getItem('transactionStatus') || 'Pending'); // Load from localStorage
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction ID submitted:', transactionId);
    setStatus('Pending'); // Simulate submission
    localStorage.setItem('transactionStatus', 'Pending'); // Store in localStorage
    setMessage('Transaction submitted! Awaiting approval...');
    setTimeout(() => setMessage(''), 3000); // Clear message after 3s
  };

  // Update status if changed externally (e.g., by AdminDashboard)
  useEffect(() => {
    const checkStatus = () => {
      const newStatus = localStorage.getItem('transactionStatus');
      if (newStatus && newStatus !== status) {
        setStatus(newStatus);
      }
    };
    const interval = setInterval(checkStatus, 1000); // Check every second
    return () => clearInterval(interval);
  }, [status]);

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      {status === 'Pending' ? (
        <div className="transaction-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="transaction-id">Enter Transaction ID:</label>
            <input
              type="text"
              id="transaction-id"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., TXN123456"
              required
            />
            <button type="submit">Submit</button>
          </form>
          {message && <p className="success-message">{message}</p>}
          <div className="status-section">
            <h3>Payment Status</h3>
            <p>Status: <span className={`status-${status.toLowerCase()}`}>{status}</span></p>
          </div>
        </div>
      ) : status === 'Approved' ? (
        <div className="post-payment-section">
          <h3>Welcome to ACM Summer School!</h3>
          <p>Your payment has been accepted. You are now registered!</p>
          <div className="post-payment-content">
            <h4>Next Steps</h4>
            <ul>
              <li>Check the <a href="/About" style={{ color: '#98FB98' }}>About</a> page for details.</li>
              <li>Download your schedule (coming soon).</li>
              <li>Contact support if you have questions.</li>
            </ul>
          </div>
          <button onClick={() => window.location.href = '/'}>Back to Home</button>
        </div>
      ) : (
        <div className="payment-rejected-section">
          <h3>Payment Rejected!</h3>
          <p>Please contact support or try again with a valid transaction.</p>
          <button onClick={() => window.location.href = '/UserDashboard'}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

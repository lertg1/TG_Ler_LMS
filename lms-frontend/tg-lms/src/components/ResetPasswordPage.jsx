import React, { useState } from 'react';
import authService from '../services/authService';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      await authService.resetPassword(email);
      alert('Password reset link sent to your email');
    } catch (error) {
      console.error('Password reset failed', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPasswordPage;
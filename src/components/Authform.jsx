import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Authform.css';

const AuthForm = () => {
  const [isActive, setIsActive] = useState(false);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log('Login Data:', { email, password });

    toast.success('Login successful (frontend)');
    setEmail('');
    setPassword('');

    navigate('/home');
  };

  const handleRegister = (e) => {
    e.preventDefault();

    console.log('Register Data:', { fullname, email, password });

    toast.success('Registration successful (frontend)');

    setFullname('');
    setEmail('');
    setPassword('');

    // Switch back to login panel
    setIsActive(false);
  };

  return (
    <div className="papa">
      <div className={`containe ${isActive ? 'active' : ''}`}>

        {/* ================= LOGIN FORM ================= */}
        <div className="for-box logi">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="butn">
              Login
            </button>
          </form>
        </div>

        {/* ================= REGISTER FORM ================= */}
        <div className="for-box register">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>

            <div className="input-box">
              <input
                type="text"
                placeholder="Full Name"
                required
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bx bxs-envelope"></i>
            </div>

            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bxs-lock-alt"></i>
            </div>

            <button type="submit" className="butn">
              Register
            </button>
          </form>
        </div>

        {/* ================= TOGGLE PANELS ================= */}
        <div className="toggle-box">

          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don’t have an account?</p>
            <button
              type="button"
              className="butn"
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              type="button"
              className="butn"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AuthForm;
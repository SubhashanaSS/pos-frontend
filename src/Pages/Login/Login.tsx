import React, { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); /
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const navigate = useNavigate(); 

  const toggleForm = () => {
    setIsLogin(!isLogin); 
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/user', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      console.log('User registered:', response.data);
      alert('User registered successfully!');
      setIsLogin(true); 
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const loginUser = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.get(`http://localhost:8080/user/${formData.email}`);
  
      if (response.status === 200) {
        const user = response.data;
        if (user.password === formData.password) {
          alert('Login successful');
          navigate('/dashboard')
        } else {
          alert('Incorrect password. Please try again.');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('User not found. Please register first.');
      } else {
        alert('Login failed. Please try again.');
      }
    }
  };
  
  return (
    <div className='bg-img'> 
      <div className='login'>
        <form onSubmit={isLogin ? loginUser : saveUser}>
          <h2 className='text-center title'>{isLogin ? 'Login Form' : 'Register Form'}</h2>

          <div data-mdb-input-init className="form-outline mb-4 mt-5">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {!isLogin && (
            <>
              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  placeholder="Enter Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  placeholder="Enter Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <div data-mdb-input-init className="form-outline mb-4">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isLogin && (
            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="form2Example31" defaultChecked />
                  <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                </div>
              </div>

              <div className="col forgot">
                <p>Forgot password?</p>
              </div>
            </div>
          )}

          <div className="btn">
            <button type="submit" className="btn btn-primary btn-block mb-4">
              {isLogin ? 'Login' : 'Register'}
            </button>
          </div>

          <div className="text-center reg">
            {isLogin ? (
              <p>Not a member? <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'white' }}>Register</span></p>
            ) : (
              <p>Already a member? <span onClick={toggleForm} style={{ cursor: 'pointer', color: 'white' }}>Login</span></p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

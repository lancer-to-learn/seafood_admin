import React, { useState } from 'react';
import './loginPage.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/authContext";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { onLoginSuccess } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      const { accessToken, refreshToken } = response.data;

      // Lưu token vào cookies
      Cookies.set('accessToken', accessToken, { expires: 30 }); // 10 phút
      Cookies.set('refreshToken', refreshToken, { expires: 30 }); // 30 ngày
      onLoginSuccess(response.data.user);

      navigate('/'); // Chuyển hướng sau khi đăng nhập thành công
    } catch (error) {
      setError(error.response?.data || 'Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow login-card">
        <div className="text-center mb-3">
          <img src="/logo.png" alt="Logo" className="login-logo" />
        </div>
        <h2 className="text-center mb-4">Đăng Nhập</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-person"></i></span>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text"><i className="bi bi-lock"></i></span>
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              <i className={passwordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
            </button>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <a href="#" className="text-decoration-none">Quên mật khẩu?</a>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Đăng Nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

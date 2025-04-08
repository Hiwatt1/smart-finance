
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://db-0p58.onrender.com/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      setIsLoggedIn(true);
      navigate('/blog');
    } catch (err) {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Вход</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Имя пользователя</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;

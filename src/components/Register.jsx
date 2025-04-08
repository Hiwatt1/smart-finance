
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://db-0p58.onrender.com/signup', formData);
      alert('Регистрация успешна, теперь можно войти');
      navigate('/login');
    } catch (err) {
      alert('Пользователь уже существует');
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Регистрация</h1>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Имя пользователя</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default Register;

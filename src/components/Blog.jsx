import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://db-0p58.onrender.com/blog-posts';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(API_URL);
      setPosts(res.data);
    } catch (err) {
      console.error('Ошибка при получении записей:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, formData);
      setPosts([res.data, ...posts]);
      setFormData({ title: '', content: '', date: '' });
    } catch (err) {
      console.error('Ошибка при добавлении записи:', err);
    }
  };

  return (
    <div className="blog-container">
      <h1 className="blog-title">Блог</h1>

      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label>Заголовок</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Введите заголовок"
          />
        </div>

        <div className="form-group">
          <label>Текст записи</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            required
            placeholder="Введите текст"
          />
        </div>

        <div className="form-group">
          <label>Дата</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Добавить запись</button>
      </form>

      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post.id} className="blog-post">
            <h2>{post.title}</h2>
            <p className="date">{post.date}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

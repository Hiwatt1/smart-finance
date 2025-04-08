
import { useState } from 'react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...formData, id: Date.now() };
    setPosts([newPost, ...posts]);
    setFormData({
      title: '',
      content: '',
      date: ''
    });
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Блог</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="title"
          placeholder="Заголовок"
          value={formData.title}
          onChange={handleChange}
          className="p-2 rounded w-full"
          required
        />
        <textarea
          name="content"
          placeholder="Текст записи"
          value={formData.content}
          onChange={handleChange}
          className="p-2 rounded w-full"
          rows="5"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
          Добавить запись
        </button>
      </form>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500">{post.date}</p>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

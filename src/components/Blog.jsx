
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
    setFormData({ title: '', content: '', date: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Блог</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Заголовок</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Введите заголовок"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Текст записи</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Введите текст записи"
              rows="5"
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Дата</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Добавить запись
          </button>
        </form>
      </div>

      <div className="max-w-2xl mx-auto mt-10 space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-5 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-500">{post.date}</p>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

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
    <div className="font-sans max-w-2xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6">Блог</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 mb-8">
        <div className="space-y-1">
          <label className="block text-sm font-semibold">Заголовок</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите заголовок"
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold">Текст записи</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Введите текст записи"
            className="w-full border border-gray-300 rounded p-2"
            rows="4"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-semibold">Дата</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Добавить запись
        </button>
      </form>

      <div className="space-y-4">
        {posts.map(post => (
          <div key={post.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 text-sm">{post.date}</p>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

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
        <div>
          <label className="block text-sm font-semibold mb-1">Заголовок</label>
          <input
            type="text"
            name="title"
            placeholder="Заголовок"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Текст записи</label>
          <textarea
            name="content"
            placeholder="Текст записи"
            value={formData.content}
            onChange={handleChange}
            rows="5"
            className="w-full border border-gray-300 rounded p-2"
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
            className="w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
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

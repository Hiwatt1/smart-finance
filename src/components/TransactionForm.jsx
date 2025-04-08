
import { useState } from 'react';

const TransactionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    type: 'expense',
    category: '',
    comment: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      date: '',
      amount: '',
      type: 'expense',
      category: '',
      comment: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow">
      <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-2 rounded w-full" required />
      <input type="number" name="amount" placeholder="Сумма" value={formData.amount} onChange={handleChange} className="p-2 rounded w-full" required />
      <select name="type" value={formData.type} onChange={handleChange} className="p-2 rounded w-full">
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>
      <input type="text" name="category" placeholder="Категория" value={formData.category} onChange={handleChange} className="p-2 rounded w-full" required />
      <input type="text" name="comment" placeholder="Комментарий" value={formData.comment} onChange={handleChange} className="p-2 rounded w-full" />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
        Добавить
      </button>
    </form>
  );
};

export default TransactionForm;

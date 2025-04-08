
import { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    comment: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://db-0p58.onrender.com/transactions', formData);
      onAdd(res.data);
      setFormData({
        type: 'income',
        amount: '',
        category: '',
        comment: '',
        date: ''
      });
    } catch (err) {
      alert('Ошибка при добавлении транзакции');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Тип</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Доход</option>
          <option value="expense">Расход</option>
        </select>
      </div>
      <div className="form-group">
        <label>Сумма</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Категория</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Комментарий</label>
        <input type="text" name="comment" value={formData.comment} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Дата</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      </div>
      <button type="submit">Добавить транзакцию</button>
    </form>
  );
};

export default TransactionForm;

1

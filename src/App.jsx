
import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import axios from 'axios';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get('https://db-0p58.onrender.com/transactions');
    setTransactions(res.data);
  };

  const addTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Учёт доходов и расходов</h1>
      <TransactionForm onAdd={addTransaction} />
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-3">Список транзакций</h2>
        {transactions.length === 0 ? (
          <p className="text-gray-500">Пока нет транзакций.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Дата</th>
                <th className="border-b p-2">Тип</th>
                <th className="border-b p-2">Сумма</th>
                <th className="border-b p-2">Категория</th>
                <th className="border-b p-2">Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td className="border-b p-2">{tx.date}</td>
                  <td className="border-b p-2">{tx.type === 'income' ? 'Доход' : 'Расход'}</td>
                  <td className="border-b p-2">{tx.amount} руб.</td>
                  <td className="border-b p-2">{tx.category}</td>
                  <td className="border-b p-2">{tx.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TransactionForm from './components/TransactionForm';
import Blog from './components/Blog';
import Login from './components/Login';
import Register from './components/Register';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchTransactions = async () => {
    const res = await axios.get('https://db-0p58.onrender.com/transactions');
    setTransactions(res.data);
  };

  const addTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  useEffect(() => {
    fetchTransactions();
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="container mx-auto max-w-2xl px-4">
        <nav className="flex flex-col gap-3 mb-6 bg-white p-4 rounded shadow text-center">
          <Link to="/" className="text-blue-600 hover:underline">Учёт</Link>
          <Link to="/blog" className="text-blue-600 hover:underline">Блог</Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-blue-600 hover:underline">Вход</Link>
              <Link to="/register" className="text-blue-600 hover:underline">Регистрация</Link>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-3xl font-bold mb-4">Учёт доходов и расходов</h1>
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
            </>
          } />
          <Route path="/blog" element={isLoggedIn ? <Blog /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


import { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import axios from 'axios';

const API_URL = 'https://db-0p58.onrender.com/transactions';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await axios.get(API_URL);
    setTransactions(res.data);
  };

  const addTransaction = async (tx) => {
    const res = await axios.post(API_URL, tx);
    setTransactions([res.data, ...transactions]);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-8">💸 Учёт доходов и расходов</h1>
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

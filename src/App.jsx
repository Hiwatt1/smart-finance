
import { useState } from 'react';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (tx) => {
    setTransactions([tx, ...transactions]);
  };

  return (
    <div className="container mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-8">💸 Учёт доходов и расходов</h1>
      <TransactionForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  );
}


import TransactionForm from './components/TransactionForm';

export default function App() {
  return (
    <div className="container mx-auto max-w-xl">
      <h1 className="text-3xl font-bold mb-8">💸 Учёт доходов и расходов</h1>
      <TransactionForm />
    </div>
  )
}


import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ru from 'date-fns/locale/ru';
import Modal from 'react-modal';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'ru-RU': ru
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales
});

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    type: 'expense',
    category: '',
    comment: ''
  });

  const fetchTransactions = async () => {
    const res = await axios.get('https://db-0p58.onrender.com/transactions');
    const mapped = res.data.map(tx => ({
      title: `${tx.amount}₽ (${tx.category})`,
      start: new Date(tx.date),
      end: new Date(tx.date),
      allDay: true
    }));
    setEvents(mapped);
  };

  const handleDateSelect = ({ start }) => {
    setFormData({ ...formData, date: format(start, 'yyyy-MM-dd') });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://db-0p58.onrender.com/transactions', formData);
    setEvents([res.data, ...events]);
    setShowModal(false);
    setFormData({ date: '', amount: '', type: 'expense', category: '', comment: '' });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow h-[700px]">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        selectable
        onSelectSlot={handleDateSelect}
      />
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} className="modal" overlayClassName="overlay">
        <h2 className="text-xl font-semibold mb-4">Добавить транзакцию</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            name="amount"
            placeholder="Сумма"
            value={formData.amount}
            onChange={handleChange}
            className="p-2 rounded w-full"
            required
          />
          <select name="type" value={formData.type} onChange={handleChange} className="p-2 rounded w-full">
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
          <input
            type="text"
            name="category"
            placeholder="Категория"
            value={formData.category}
            onChange={handleChange}
            className="p-2 rounded w-full"
            required
          />
          <input
            type="text"
            name="comment"
            placeholder="Комментарий"
            value={formData.comment}
            onChange={handleChange}
            className="p-2 rounded w-full"
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Добавить
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarView;

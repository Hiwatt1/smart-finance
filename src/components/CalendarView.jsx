
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ru from 'date-fns/locale/ru';
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
      />
    </div>
  );
};

export default CalendarView;

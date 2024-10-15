import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = (newDate: Date, view: string, action: string) => {
    setCurrentDate(newDate);
  };

  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
      toolbar.onNavigate('TODAY');
    };

    const label = () => {
      const date = moment(toolbar.date);
      return (
        <span className="holographic-text">
          {date.format('MMMM')} {date.format('YYYY')}
        </span>
      );
    };

    return (
      <div className="flex justify-between items-center mb-4">
        <div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-2 p-2 bg-blue-500 rounded-full"
            onClick={goToBack}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-2 p-2 bg-blue-500 rounded-full"
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
        <div className="text-xl font-bold">{label()}</div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-blue-500 rounded"
          onClick={goToCurrent}
        >
          Today
        </motion.button>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-8rem)] glassmorphism rounded-lg overflow-hidden">
      <BigCalendar
        localizer={localizer}
        events={[]}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={(slotInfo) => onSelectDate(slotInfo.start)}
        selectable
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        date={currentDate}
        onNavigate={handleNavigate}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};
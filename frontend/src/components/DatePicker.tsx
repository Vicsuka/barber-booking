import React from 'react';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  // Generate next 14 days (2 weeks)
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.toDateString() === date2.toDateString();
  };

  return (
    <div className='mb-6'>
      <h3 className='text-lg font-medium text-gray-800 mb-4'>Select a Date</h3>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2'>
        {dates.map((date, index) => (
          <button
            key={index}
            onClick={() => onDateSelect(date)}
            className={`
              p-3 rounded-md text-sm font-medium transition-all duration-200 border
              ${
                isSameDate(selectedDate, date)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }
              ${isToday(date) ? 'ring-2 ring-blue-200' : ''}
            `}
          >
            <div className='text-xs text-gray-500 mb-1'>
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div>{date.getDate()}</div>
            {isToday(date) && (
              <div className='text-xs text-blue-600 mt-1'>Today</div>
            )}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-md'>
          <p className='text-green-800 text-sm'>
            ✓ Selected:{' '}
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  );
};

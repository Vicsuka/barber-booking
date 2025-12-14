import React from 'react';
import type { Barber, TimeSlot } from '../types';

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  selectedBarber: Barber | null;
  selectedTimeSlot: TimeSlot | null;
  onTimeSlotSelect: (timeSlot: TimeSlot) => void;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  selectedBarber,
  selectedTimeSlot,
  onTimeSlotSelect,
}) => {
  // Generate time slots based on barber's schedule
  const generateTimeSlots = (): TimeSlot[] => {
    if (!selectedDate || !selectedBarber) return [];

    const dayName = selectedDate
      .toLocaleDateString('en-US', { weekday: 'long' })
      .toLowerCase() as keyof Barber['workSchedule'];
    const schedule = selectedBarber.workSchedule[dayName];

    // If barber doesn't work this day
    if (!schedule.start || !schedule.end) return [];

    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = schedule.start.split(':').map(Number);
    const [endHour, endMinute] = schedule.end.split(':').map(Number);

    const startTime = startHour * 60 + startMinute; // Convert to minutes
    const endTime = endHour * 60 + endMinute;

    // Generate 30-minute slots
    for (let time = startTime; time < endTime; time += 30) {
      const hour = Math.floor(time / 60);
      const minute = time % 60;

      const timeString = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;

      // Create full datetime string
      const dateTime = new Date(selectedDate);
      dateTime.setHours(hour, minute, 0, 0);

      slots.push({
        time: timeString,
        available: true, // TODO: Check against existing bookings
        dateTime: dateTime.toISOString(),
      });
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  if (!selectedDate) {
    return (
      <div className='mb-6'>
        <h3 className='text-lg font-medium text-gray-800 mb-4'>Select Time</h3>
        <p className='text-gray-500 text-center py-8'>
          Please select a date first
        </p>
      </div>
    );
  }

  if (!selectedBarber) {
    return (
      <div className='mb-6'>
        <h3 className='text-lg font-medium text-gray-800 mb-4'>Select Time</h3>
        <p className='text-gray-500 text-center py-8'>
          Please select a barber first
        </p>
      </div>
    );
  }

  if (timeSlots.length === 0) {
    const dayName = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    return (
      <div className='mb-6'>
        <h3 className='text-lg font-medium text-gray-800 mb-4'>Select Time</h3>
        <div className='text-center py-8'>
          <p className='text-gray-500'>
            {selectedBarber.name} is not available on {dayName}s
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            Please select a different date
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='mb-6'>
      <h3 className='text-lg font-medium text-gray-800 mb-4'>
        Select Time for {selectedBarber.name}
      </h3>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            onClick={() => onTimeSlotSelect(slot)}
            disabled={!slot.available}
            className={`
              p-3 rounded-md text-sm font-medium transition-all duration-200 border
              ${
                selectedTimeSlot?.time === slot.time
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : slot.available
                  ? 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {formatTime(slot.time)}
          </button>
        ))}
      </div>

      {selectedTimeSlot && (
        <div className='mt-4 p-3 bg-green-50 border border-green-200 rounded-md'>
          <p className='text-green-800 text-sm'>
            ✓ Selected: {formatTime(selectedTimeSlot.time)} on{' '}
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  );
};

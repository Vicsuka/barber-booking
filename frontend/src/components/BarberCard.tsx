import React from 'react';
import type { Barber } from '../types';

interface BarberCardProps {
  barber: Barber;
  onSelect: (barber: Barber) => void;
  isSelected?: boolean;
}

export const BarberCard: React.FC<BarberCardProps> = ({
  barber,
  onSelect,
  isSelected = false,
}) => {
  const formatWorkDay = (day: keyof Barber['workSchedule']) => {
    const schedule = barber.workSchedule[day];
    if (!schedule.start || !schedule.end) return 'Closed';
    return `${schedule.start} - ${schedule.end}`;
  };

  const workingDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ] as const;

  return (
    <div
      className={`
        border rounded-lg p-6 cursor-pointer transition-all duration-200
        ${
          isSelected
            ? 'border-blue-500 bg-blue-50 shadow-md'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
        }
      `}
      onClick={() => onSelect(barber)}
    >
      <div className='flex items-start justify-between'>
        <div className='flex-1'>
          <h3
            className={`text-lg font-semibold ${
              isSelected ? 'text-blue-700' : 'text-gray-800'
            }`}
          >
            {barber.name}
          </h3>
          <p className='text-sm text-gray-600 mt-1'>Professional Barber</p>
        </div>

        <div className='ml-4'>
          <div
            className={`
            w-4 h-4 rounded-full border-2 
            ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}
          `}
          >
            {isSelected && (
              <div className='w-full h-full rounded-full bg-white scale-50'></div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-4'>
        <h4 className='text-sm font-medium text-gray-700 mb-2'>
          Working Hours:
        </h4>
        <div className='grid grid-cols-2 gap-1 text-xs'>
          {workingDays.slice(0, 4).map((day) => (
            <div key={day} className='flex justify-between'>
              <span className='capitalize text-gray-600'>
                {day.slice(0, 3)}:
              </span>
              <span className='text-gray-800'>{formatWorkDay(day)}</span>
            </div>
          ))}
        </div>
        <div className='grid grid-cols-2 gap-1 text-xs mt-1'>
          {workingDays.slice(4).map((day) => (
            <div key={day} className='flex justify-between'>
              <span className='capitalize text-gray-600'>
                {day.slice(0, 3)}:
              </span>
              <span className='text-gray-800'>{formatWorkDay(day)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

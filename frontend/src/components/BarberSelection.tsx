import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { BarberCard } from './BarberCard';
import type { Barber } from '../types';

interface BarberSelectionProps {
  onBarberSelect: (barber: Barber | null) => void;
  selectedBarber: Barber | null;
}

export const BarberSelection: React.FC<BarberSelectionProps> = ({
  onBarberSelect,
  selectedBarber,
}) => {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getBarbers();

      if (response.success && response.data) {
        setBarbers(response.data);
      } else {
        setError(response.error || 'Failed to load barbers');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBarberSelect = (barber: Barber) => {
    if (selectedBarber?.id === barber.id) {
      onBarberSelect(null); // Deselect if already selected
    } else {
      onBarberSelect(barber);
    }
  };

  if (loading) {
    return (
      <div className='text-center py-8'>
        <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
        <p className='mt-2 text-gray-600'>Loading barbers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center py-8'>
        <div className='text-red-600 mb-4'>
          <svg
            className='mx-auto h-12 w-12 mb-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
          <p className='text-sm'>{error}</p>
        </div>
        <button
          onClick={loadBarbers}
          className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
        >
          Try Again
        </button>
      </div>
    );
  }

  if (barbers.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <p>No barbers available at the moment.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>
        Choose Your Barber ({barbers.length} available)
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {barbers.map((barber) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            onSelect={handleBarberSelect}
            isSelected={selectedBarber?.id === barber.id}
          />
        ))}
      </div>

      {selectedBarber && (
        <div className='mt-6 p-4 bg-green-50 border border-green-200 rounded-md'>
          <p className='text-green-800'>
            ✓ Selected: <strong>{selectedBarber.name}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

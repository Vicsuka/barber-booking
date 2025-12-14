import { useState } from 'react';
import { BarberSelection } from './components/BarberSelection';
import { DatePicker } from './components/DatePicker';
import { TimeSlotPicker } from './components/TimeSlotPicker';
import type { Barber, TimeSlot } from './types';

function App() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-blue-600 text-white shadow-lg'>
        <div className='container mx-auto px-4 py-6'>
          <h1 className='text-3xl font-bold'>Barber Booking System</h1>
          <p className='text-blue-100 mt-2'>
            Book your appointment with our skilled barbers
          </p>
        </div>
      </header>

      <main className='container mx-auto px-4 py-8'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <BarberSelection
            onBarberSelect={setSelectedBarber}
            selectedBarber={selectedBarber}
          />

          {selectedBarber && (
            <>
              <div className='mt-8 p-6 bg-green-50 border border-green-200 rounded-lg'>
                <h3 className='text-xl font-semibold text-green-800 mb-2'>
                  Selected Barber: {selectedBarber.name}
                </h3>
                <p className='text-green-600'>
                  You have selected {selectedBarber.name} for your appointment.
                </p>
              </div>

              <div className='mt-8'>
                <DatePicker
                  onDateSelect={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </div>

              {selectedDate && (
                <div className='mt-8'>
                  <TimeSlotPicker
                    selectedBarber={selectedBarber}
                    selectedDate={selectedDate}
                    onTimeSlotSelect={setSelectedTimeSlot}
                    selectedTimeSlot={selectedTimeSlot}
                  />
                </div>
              )}

              {selectedTimeSlot && (
                <div className='mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg'>
                  <h3 className='text-xl font-semibold text-blue-800 mb-4'>
                    Booking Summary
                  </h3>
                  <div className='space-y-2 text-gray-700'>
                    <p>
                      <strong>Barber:</strong> {selectedBarber.name}
                    </p>
                    <p>
                      <strong>Date:</strong>{' '}
                      {selectedDate?.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedTimeSlot.time}
                    </p>
                  </div>
                  <button
                    className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                    onClick={() => {
                      // TODO: Implement booking creation
                      console.log('Create booking:', {
                        selectedBarber,
                        selectedDate,
                        selectedTimeSlot,
                      });
                    }}
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

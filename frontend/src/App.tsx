import { useState } from 'react';
import { BarberSelection } from './components/BarberSelection';
import type { Barber } from './types';

function App() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);

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
            <div className='mt-8 pt-6 border-t'>
              <h3 className='text-lg font-medium text-gray-800 mb-4'>
                Next Steps
              </h3>
              <div className='flex space-x-4'>
                <button className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors'>
                  Select Date & Time
                </button>
                <button className='border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors'>
                  View My Bookings
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

import { useState } from 'react';
import { BarberSelection } from './components/BarberSelection';
import { DatePicker } from './components/DatePicker';
import { TimeSlotPicker } from './components/TimeSlotPicker';
import { apiService } from './services/api';
import type { Barber, TimeSlot, Booking } from './types';

function App() {
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
  const [customerEmail, setCustomerEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    type: 'success' | 'error';
    message: string;
    booking?: Booking;
  } | null>(null);

  const handleCreateBooking = async () => {
    if (
      !selectedBarber ||
      !selectedDate ||
      !selectedTimeSlot ||
      !customerEmail.trim()
    ) {
      setBookingResult({
        type: 'error',
        message: 'Please fill in all required fields',
      });
      return;
    }

    setIsCreatingBooking(true);
    setBookingResult(null);

    try {
      const result = await apiService.createBooking({
        barberId: selectedBarber.id,
        customerEmail: customerEmail.trim(),
        dateTime: selectedTimeSlot.dateTime,
      });

      if (result.success && result.data) {
        setBookingResult({
          type: 'success',
          message: 'Booking created successfully!',
          booking: result.data,
        });
        // Reset form
        setSelectedBarber(null);
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setCustomerEmail('');
        setShowEmailForm(false);
      } else {
        setBookingResult({
          type: 'error',
          message: result.error || 'Failed to create booking',
        });
      }
    } catch (error) {
      setBookingResult({
        type: 'error',
        message: 'Network error - please try again',
      });
    } finally {
      setIsCreatingBooking(false);
    }
  };

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
                  <div className='space-y-2 text-gray-700 mb-4'>
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

                  {!showEmailForm ? (
                    <button
                      className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                      onClick={() => setShowEmailForm(true)}
                    >
                      Continue to Book
                    </button>
                  ) : (
                    <div className='space-y-4'>
                      <div>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium text-gray-700 mb-2'
                        >
                          Email Address *
                        </label>
                        <input
                          type='email'
                          id='email'
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder='Enter your email address'
                          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          required
                        />
                      </div>

                      <div className='flex space-x-3'>
                        <button
                          onClick={handleCreateBooking}
                          disabled={isCreatingBooking || !customerEmail.trim()}
                          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            isCreatingBooking || !customerEmail.trim()
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-green-600 hover:bg-green-700'
                          } text-white`}
                        >
                          {isCreatingBooking
                            ? 'Creating...'
                            : 'Confirm Booking'}
                        </button>

                        <button
                          onClick={() => {
                            setShowEmailForm(false);
                            setCustomerEmail('');
                            setBookingResult(null);
                          }}
                          disabled={isCreatingBooking}
                          className='px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors'
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {bookingResult && (
                <div
                  className={`mt-8 p-6 rounded-lg border ${
                    bookingResult.type === 'success'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      bookingResult.type === 'success'
                        ? 'text-green-800'
                        : 'text-red-800'
                    }`}
                  >
                    {bookingResult.type === 'success'
                      ? '✅ Booking Confirmed!'
                      : '❌ Booking Failed'}
                  </h3>

                  <p
                    className={`mb-4 ${
                      bookingResult.type === 'success'
                        ? 'text-green-700'
                        : 'text-red-700'
                    }`}
                  >
                    {bookingResult.message}
                  </p>

                  {bookingResult.booking && (
                    <div className='bg-white p-4 rounded-md border border-green-300'>
                      <h4 className='font-medium text-gray-800 mb-2'>
                        Booking Details:
                      </h4>
                      <div className='text-sm text-gray-600 space-y-1'>
                        <p>
                          <strong>Booking ID:</strong>{' '}
                          {bookingResult.booking.id}
                        </p>
                        <p>
                          <strong>Email:</strong>{' '}
                          {bookingResult.booking.customerEmail}
                        </p>
                        <p>
                          <strong>Status:</strong>{' '}
                          {bookingResult.booking.status}
                        </p>
                      </div>
                    </div>
                  )}

                  {bookingResult.type === 'success' && (
                    <button
                      onClick={() => setBookingResult(null)}
                      className='mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                    >
                      Book Another Appointment
                    </button>
                  )}
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

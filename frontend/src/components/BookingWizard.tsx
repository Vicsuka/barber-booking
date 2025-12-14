import React, { useState } from 'react';
import { VStack, Box } from '@chakra-ui/react';
import { BarberSelection } from './BarberSelection';
import { DatePicker } from './DatePicker';
import { TimeSlotPicker } from './TimeSlotPicker';
import { BookingSummary } from './BookingSummary';
import { BookingResult } from './BookingResult';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Barber, TimeSlot, Booking } from '../types';

export const BookingWizard: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
  const [bookingResult, setBookingResult] = useState<{
    type: 'success' | 'error';
    message: string;
    booking?: Booking;
  } | null>(null);

  const handleBookingComplete = (result: {
    type: 'success' | 'error';
    message: string;
    booking?: Booking;
  }) => {
    setBookingResult(result);
  };

  const handleStartNewBooking = () => {
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTimeSlot(null);
    setBookingResult(null);
  };

  const handleTryAgain = () => {
    setBookingResult(null);
  };

  return (
    <Box
      bg={isDarkMode ? 'gray.800' : 'white'}
      shadow='lg'
      borderRadius='xl'
      p={{ base: 4, md: 6 }}
      borderWidth='1px'
      borderColor={isDarkMode ? 'gray.600' : 'gray.200'}
      transition='all 0.2s'
    >
      <VStack gap={{ base: 6, md: 8 }} align='stretch'>
        {!bookingResult ? (
          <>
            <BarberSelection
              onBarberSelect={setSelectedBarber}
              selectedBarber={selectedBarber}
            />

            {selectedBarber && (
              <DatePicker
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
            )}

            {selectedBarber && selectedDate && (
              <TimeSlotPicker
                selectedBarber={selectedBarber}
                selectedDate={selectedDate}
                onTimeSlotSelect={setSelectedTimeSlot}
                selectedTimeSlot={selectedTimeSlot}
              />
            )}

            {selectedBarber && selectedDate && selectedTimeSlot && (
              <BookingSummary
                selectedBarber={selectedBarber}
                selectedDate={selectedDate}
                selectedTimeSlot={selectedTimeSlot}
                onBookingComplete={handleBookingComplete}
              />
            )}
          </>
        ) : (
          <BookingResult
            result={bookingResult}
            onStartNewBooking={handleStartNewBooking}
            onTryAgain={handleTryAgain}
          />
        )}
      </VStack>
    </Box>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  VStack,
  Text,
  Center,
  HStack,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { apiService } from '../services/api';
import type { Barber, TimeSlot, Booking } from '../types';

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
  const { isDarkMode } = useDarkMode();
  const [existingBookings, setExistingBookings] = useState<Booking[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Fetch existing bookings when barber or date changes
  useEffect(() => {
    const fetchExistingBookings = async () => {
      if (!selectedDate || !selectedBarber) {
        setExistingBookings([]);
        return;
      }

      setIsLoadingBookings(true);
      try {
        const dateString = selectedDate.toISOString().split('T')[0];
        const result = await apiService.getBookingsByBarberAndDate(
          selectedBarber.id,
          dateString,
        );

        if (result.success && result.data) {
          setExistingBookings(result.data);
        } else {
          console.error('Failed to fetch bookings:', result.error);
          setExistingBookings([]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setExistingBookings([]);
      } finally {
        setIsLoadingBookings(false);
      }
    };

    fetchExistingBookings();
  }, [selectedDate, selectedBarber]);

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

      // Check if this time slot is already booked
      const isBooked = existingBookings.some((booking) => {
        const bookingDateTime = new Date(booking.dateTime);
        return bookingDateTime.getTime() === dateTime.getTime();
      });

      slots.push({
        time: timeString,
        available: !isBooked,
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

  const selectedBg = isDarkMode ? 'blue.700' : 'blue.50';
  const selectedBorder = isDarkMode ? 'blue.400' : 'blue.500';
  const defaultBg = isDarkMode ? 'gray.700' : 'white';
  const defaultBorder = isDarkMode ? 'gray.600' : 'gray.200';
  const disabledBg = isDarkMode ? 'gray.800' : 'gray.50';

  if (!selectedDate) {
    return (
      <VStack gap={4} align='stretch'>
        <Heading
          as='h3'
          size={{ base: 'md', md: 'lg' }}
          color={isDarkMode ? 'gray.100' : 'gray.800'}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Select Time
        </Heading>
        <Center py={8}>
          <Text
            color={isDarkMode ? 'gray.400' : 'gray.500'}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            Please select a date first
          </Text>
        </Center>
      </VStack>
    );
  }

  if (!selectedBarber) {
    return (
      <VStack gap={4} align='stretch'>
        <Heading
          as='h3'
          size={{ base: 'md', md: 'lg' }}
          color={isDarkMode ? 'gray.100' : 'gray.800'}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Select Time
        </Heading>
        <Center py={8}>
          <Text
            color={isDarkMode ? 'gray.400' : 'gray.500'}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            Please select a barber first
          </Text>
        </Center>
      </VStack>
    );
  }

  if (timeSlots.length === 0) {
    const dayName = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
    });
    return (
      <VStack gap={4} align='stretch'>
        <Heading
          as='h3'
          size={{ base: 'md', md: 'lg' }}
          color={isDarkMode ? 'gray.100' : 'gray.800'}
          textAlign={{ base: 'center', md: 'left' }}
        >
          Select Time
        </Heading>
        <Center py={8}>
          <VStack gap={2}>
            <Text
              color={isDarkMode ? 'gray.400' : 'gray.500'}
              fontSize={{ base: 'md', md: 'lg' }}
              textAlign='center'
            >
              {selectedBarber.name} is not available on {dayName}s
            </Text>
            <Text
              fontSize='sm'
              color={isDarkMode ? 'gray.500' : 'gray.400'}
              textAlign='center'
            >
              Please select a different date
            </Text>
          </VStack>
        </Center>
      </VStack>
    );
  }

  return (
    <VStack gap={6} align='stretch'>
      <Heading
        as='h3'
        size={{ base: 'md', md: 'lg' }}
        color={isDarkMode ? 'gray.100' : 'gray.800'}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Select Time for {selectedBarber.name}
      </Heading>

      {isLoadingBookings ? (
        <Center py={8}>
          <Text
            color={isDarkMode ? 'gray.400' : 'gray.500'}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            Loading available times...
          </Text>
        </Center>
      ) : (
        <SimpleGrid
          columns={{ base: 2, sm: 3, md: 4, lg: 6 }}
          gap={{ base: 2, md: 3 }}
        >
          {timeSlots.map((slot, index) => (
            <Button
              key={index}
              onClick={() => onTimeSlotSelect(slot)}
              disabled={!slot.available}
              variant='outline'
              bg={
                selectedTimeSlot?.time === slot.time
                  ? selectedBg
                  : slot.available
                  ? defaultBg
                  : disabledBg
              }
              borderColor={
                selectedTimeSlot?.time === slot.time
                  ? selectedBorder
                  : slot.available
                  ? defaultBorder
                  : isDarkMode
                  ? 'gray.700'
                  : 'gray.200'
              }
              color={
                selectedTimeSlot?.time === slot.time
                  ? isDarkMode
                    ? 'blue.100'
                    : 'blue.700'
                  : slot.available
                  ? isDarkMode
                    ? 'gray.100'
                    : 'gray.700'
                  : isDarkMode
                  ? 'gray.500'
                  : 'gray.400'
              }
              _hover={
                slot.available
                  ? {
                      bg:
                        selectedTimeSlot?.time === slot.time
                          ? selectedBg
                          : isDarkMode
                          ? 'gray.600'
                          : 'gray.50',
                      borderColor:
                        selectedTimeSlot?.time === slot.time
                          ? selectedBorder
                          : isDarkMode
                          ? 'gray.500'
                          : 'gray.300',
                    }
                  : {}
              }
              size={{ base: 'sm', md: 'md' }}
              h={{ base: '10', md: '12' }}
              title={
                !slot.available ? 'This time slot is already booked' : undefined
              }
            >
              {formatTime(slot.time)}
              {!slot.available && (
                <Text fontSize='xs' opacity={0.7} ml={1}>
                  (Booked)
                </Text>
              )}
            </Button>
          ))}
        </SimpleGrid>
      )}

      {selectedTimeSlot && (
        <Box
          bg={isDarkMode ? 'green.900' : 'green.50'}
          p={4}
          borderRadius='md'
          border='1px'
          borderColor={isDarkMode ? 'green.700' : 'green.200'}
        >
          <HStack gap={2}>
            <CheckCircle color={isDarkMode ? '#68D391' : 'green'} size={20} />
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color={isDarkMode ? 'green.200' : 'green.800'}
            >
              Selected: {formatTime(selectedTimeSlot.time)} on{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

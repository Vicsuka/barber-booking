'use client';

import React from 'react';
import { Box, HStack, VStack, Text, Button } from '@chakra-ui/react';
import { Calendar, Clock, User, Trash2 } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Booking } from '../types';

interface BookingListItemProps {
  booking: Booking;
  onDelete: (booking: Booking) => void;
}

export const BookingListItem: React.FC<BookingListItemProps> = ({
  booking,
  onDelete,
}) => {
  const { isDarkMode } = useDarkMode();

  const formatBookingDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatBookingTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <Box
      p={6}
      bg={isDarkMode ? 'gray.800' : 'white'}
      borderRadius='lg'
      border='1px'
      borderColor={isDarkMode ? 'gray.700' : 'gray.200'}
      shadow='sm'
      _hover={{
        shadow: 'md',
        borderColor: isDarkMode ? 'gray.600' : 'gray.300',
      }}
      transition='all 0.2s'
    >
      <HStack justify='space-between' align='start'>
        <VStack align='start' gap={3} flex={1}>
          <HStack gap={2}>
            <Calendar size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            <Text
              fontSize='sm'
              fontWeight='medium'
              color={isDarkMode ? 'gray.300' : 'gray.700'}
            >
              {formatBookingDate(booking.dateTime)}
            </Text>
          </HStack>

          <HStack gap={2}>
            <Clock size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            <Text
              fontSize='sm'
              fontWeight='medium'
              color={isDarkMode ? 'gray.300' : 'gray.700'}
            >
              {formatBookingTime(booking.dateTime)}
            </Text>
          </HStack>

          <HStack gap={2}>
            <User size={16} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
            <Text fontSize='sm' color={isDarkMode ? 'gray.400' : 'gray.600'}>
              Barber ID: {booking.barberId}
            </Text>
          </HStack>
        </VStack>

        <Button
          onClick={() => onDelete(booking)}
          variant='outline'
          colorScheme='red'
          size='sm'
          bg={isDarkMode ? 'transparent' : 'white'}
          borderColor={isDarkMode ? 'red.500' : 'red.300'}
          color={isDarkMode ? 'red.300' : 'red.600'}
          _hover={{
            bg: isDarkMode ? 'red.900' : 'red.50',
            borderColor: isDarkMode ? 'red.400' : 'red.400',
          }}
        >
          <HStack gap={2}>
            <Trash2 size={16} />
            <Text>Delete</Text>
          </HStack>
        </Button>
      </HStack>
    </Box>
  );
};


'use client';

import React, { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Input,
  Text,
  Spinner,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Barber, TimeSlot, Booking } from '../types';

interface BookingSummaryProps {
  selectedBarber: Barber;
  selectedDate: Date;
  selectedTimeSlot: TimeSlot;
  onBookingComplete: (result: {
    type: 'success' | 'error';
    message: string;
    booking?: Booking;
  }) => void;
}

export const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedBarber,
  selectedDate,
  selectedTimeSlot,
  onBookingComplete,
}) => {
  const { isDarkMode } = useDarkMode();
  const [customerEmail, setCustomerEmail] = useState('');
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);

  const handleCreateBooking = async () => {
    if (!customerEmail.trim()) {
      onBookingComplete({
        type: 'error',
        message: 'Please enter your email address',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail.trim())) {
      onBookingComplete({
        type: 'error',
        message: 'Please enter a valid email address',
      });
      return;
    }

    setIsCreatingBooking(true);

    try {
      const result = await apiService.createBooking({
        barberId: selectedBarber.id,
        dateTime: selectedTimeSlot.dateTime,
        customerEmail: customerEmail.trim(),
      });

      if (result.success && result.data) {
        onBookingComplete({
          type: 'success',
          message: 'Booking created successfully!',
          booking: result.data,
        });
      } else {
        onBookingComplete({
          type: 'error',
          message: result.error || 'Failed to create booking',
        });
      }
    } catch (error) {
      onBookingComplete({
        type: 'error',
        message: 'Network error - please check your connection and try again',
      });
    } finally {
      setIsCreatingBooking(false);
    }
  };

  return (
    <Box>
      {/* Selected Barber Confirmation */}
      <Box
        bg={isDarkMode ? 'green.900' : 'green.50'}
        p={4}
        borderRadius='lg'
        border='1px'
        borderColor={isDarkMode ? 'green.600' : 'green.200'}
        mb={6}
      >
        <HStack align='start' gap={3}>
          <CheckCircle color='green' size={20} />
          <Box>
            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              fontWeight='bold'
              color={'green.400'}
            >
              Selected Barber: {selectedBarber.name}
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} color='green.700'>
              You have selected {selectedBarber.name} for your appointment.
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* Booking Summary */}
      <Box
        bg={isDarkMode ? 'blue.900' : 'blue.50'}
        borderColor={isDarkMode ? 'blue.600' : 'blue.200'}
        borderWidth={1}
        borderRadius='lg'
        p={6}
      >
        <Heading
          size={{ base: 'md', md: 'lg' }}
          color={isDarkMode ? 'blue.200' : 'blue.800'}
          mb={4}
        >
          Booking Summary
        </Heading>

        <VStack align='stretch' gap={4}>
          <VStack align='stretch' gap={2}>
            <HStack>
              <Text
                fontWeight='bold'
                color={isDarkMode ? 'gray.300' : 'gray.700'}
              >
                Barber:
              </Text>
              <Text color={isDarkMode ? 'gray.400' : 'gray.600'}>
                {selectedBarber.name}
              </Text>
            </HStack>
            <HStack>
              <Text
                fontWeight='bold'
                color={isDarkMode ? 'gray.300' : 'gray.700'}
              >
                Date:
              </Text>
              <Text color={isDarkMode ? 'gray.400' : 'gray.600'}>
                {selectedDate.toLocaleDateString()}
              </Text>
            </HStack>
            <HStack>
              <Text
                fontWeight='bold'
                color={isDarkMode ? 'gray.300' : 'gray.700'}
              >
                Time:
              </Text>
              <Text color={isDarkMode ? 'gray.400' : 'gray.600'}>
                {selectedTimeSlot.time}
              </Text>
            </HStack>
          </VStack>

          <Box h='1px' bg={isDarkMode ? 'gray.600' : 'gray.200'} />

          {!showEmailForm ? (
            <Button
              bg={isDarkMode ? 'blue.600' : 'blue.500'}
              color='white'
              _hover={{ bg: isDarkMode ? 'blue.500' : 'blue.600' }}
              size={{ base: 'md', md: 'lg' }}
              onClick={() => setShowEmailForm(true)}
              width='full'
            >
              Continue to Book
            </Button>
          ) : (
            <VStack gap={4} align='stretch'>
              <Box>
                <Text
                  color={isDarkMode ? 'gray.300' : 'gray.700'}
                  fontSize={{ base: 'sm', md: 'md' }}
                  mb={2}
                  fontWeight='medium'
                >
                  Email Address *
                </Text>
                <Input
                  type='email'
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder='Enter your email address'
                  borderColor={isDarkMode ? 'gray.600' : 'blue.200'}
                  bg={isDarkMode ? 'gray.700' : 'white'}
                  color={isDarkMode ? 'white' : 'gray.900'}
                  _placeholder={{
                    color: isDarkMode ? 'gray.400' : 'gray.500',
                  }}
                  size={{ base: 'md', md: 'lg' }}
                  _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
                  }}
                />
              </Box>

              <HStack gap={3} flexDirection={{ base: 'column', sm: 'row' }}>
                <Button
                  onClick={handleCreateBooking}
                  disabled={isCreatingBooking || !customerEmail.trim()}
                  bg={isDarkMode ? 'green.600' : 'green.500'}
                  color='white'
                  _hover={{ bg: isDarkMode ? 'green.500' : 'green.600' }}
                  _disabled={{
                    bg: isDarkMode ? 'gray.600' : 'gray.300',
                    color: isDarkMode ? 'gray.400' : 'gray.500',
                    cursor: 'not-allowed',
                  }}
                  size={{ base: 'md', md: 'lg' }}
                  flex={1}
                >
                  {isCreatingBooking ? (
                    <HStack gap={2}>
                      <Spinner size='sm' color='white' />
                      <Text>Creating...</Text>
                    </HStack>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>

                <Button
                  onClick={() => {
                    setShowEmailForm(false);
                    setCustomerEmail('');
                  }}
                  disabled={isCreatingBooking}
                  variant='outline'
                  bg={isDarkMode ? 'gray.800' : 'white'}
                  borderColor={isDarkMode ? 'gray.600' : 'gray.300'}
                  color={isDarkMode ? 'gray.300' : 'gray.700'}
                  _hover={{ bg: isDarkMode ? 'gray.700' : 'gray.50' }}
                  _disabled={{
                    bg: isDarkMode ? 'gray.900' : 'gray.100',
                    borderColor: isDarkMode ? 'gray.700' : 'gray.200',
                    color: isDarkMode ? 'gray.500' : 'gray.400',
                    cursor: 'not-allowed',
                  }}
                  size={{ base: 'md', md: 'lg' }}
                  flex={{ base: 1, sm: 'none' }}
                >
                  Back
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
      </Box>
    </Box>
  );
};


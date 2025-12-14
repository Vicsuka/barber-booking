'use client';

import React from 'react';
import { Box, HStack, Text, Button, Spinner, VStack } from '@chakra-ui/react';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Booking } from '../types';

interface DeleteBookingModalProps {
  isOpen: boolean;
  booking: Booking | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteBookingModal: React.FC<DeleteBookingModalProps> = ({
  isOpen,
  booking,
  isDeleting,
  onClose,
  onConfirm,
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

  if (!isOpen) return null;

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg='blackAlpha.600'
      display='flex'
      alignItems='center'
      justifyContent='center'
      zIndex={1000}
      onClick={onClose}
    >
      <Box
        bg={isDarkMode ? 'gray.800' : 'white'}
        borderRadius='lg'
        boxShadow='xl'
        maxWidth='md'
        width='90%'
        border='1px solid'
        borderColor={isDarkMode ? 'gray.700' : 'gray.200'}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Box
          p={6}
          pb={0}
          fontSize='lg'
          fontWeight='bold'
          color={isDarkMode ? 'gray.100' : 'gray.800'}
        >
          Delete Booking
        </Box>

        {/* Body */}
        <Box p={6} color={isDarkMode ? 'gray.300' : 'gray.600'}>
          {booking && (
            <VStack align='stretch' gap={3}>
              <Text>Are you sure you want to delete this booking?</Text>
              <Box
                mt={2}
                p={3}
                bg={isDarkMode ? 'gray.700' : 'gray.50'}
                borderRadius='md'
              >
                <Text fontSize='sm'>
                  <strong>Date:</strong> {formatBookingDate(booking.dateTime)}
                </Text>
                <Text fontSize='sm'>
                  <strong>Time:</strong> {formatBookingTime(booking.dateTime)}
                </Text>
              </Box>
              <Text fontSize='sm' color={isDarkMode ? 'gray.400' : 'gray.500'}>
                This action cannot be undone.
              </Text>
            </VStack>
          )}
        </Box>

        {/* Footer */}
        <Box p={6} pt={0}>
          <HStack gap={3} justifyContent='flex-end'>
            <Button
              onClick={onClose}
              variant='outline'
              borderColor={isDarkMode ? 'gray.600' : 'gray.300'}
              color={isDarkMode ? 'gray.300' : 'gray.700'}
              bg={isDarkMode ? 'transparent' : 'white'}
              _hover={{ bg: isDarkMode ? 'gray.700' : 'gray.50' }}
            >
              Keep Booking
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isDeleting}
              colorScheme='red'
              bg={isDarkMode ? 'red.600' : 'red.500'}
              _hover={{ bg: isDarkMode ? 'red.500' : 'red.600' }}
            >
              {isDeleting ? (
                <HStack gap={2}>
                  <Spinner size='sm' color='white' />
                  <Text>Deleting...</Text>
                </HStack>
              ) : (
                'Delete Booking'
              )}
            </Button>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};


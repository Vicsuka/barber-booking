import React, { useState } from 'react';
import {
  VStack,
  Heading,
  Text,
  Center,
  Spinner,
  Box,
  HStack,
} from '@chakra-ui/react';
import { AlertCircle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import { apiService } from '../services/api';
import { BookingSearchForm } from './BookingSearchForm';
import { BookingListItem } from './BookingListItem';
import { DeleteBookingModal } from './DeleteBookingModal';
import type { Booking } from '../types';

export const BookingManagement: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeletingBooking, setIsDeletingBooking] = useState(false);

  const handleSearchBookings = async () => {
    if (!email.trim()) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setBookings([]);

    try {
      const result = await apiService.getBookingsByEmail(email.trim());

      if (result.success && result.data) {
        setBookings(result.data);
        if (result.data.length === 0) {
          setError('No bookings found for this email address');
        }
      } else {
        setError(result.error || 'Failed to fetch bookings');
      }
    } catch (error) {
      setError('Network error - please check your connection');
    } finally {
      setIsLoading(false);
    }
  };

  const openDeleteModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsOpen(true);
  };

  const closeDeleteModal = () => {
    setIsOpen(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = async () => {
    if (!selectedBooking) return;

    setIsDeletingBooking(true);
    try {
      const result = await apiService.deleteBooking(selectedBooking.id);

      if (result.success) {
        setBookings((prev) =>
          prev.filter((booking) => booking.id !== selectedBooking.id),
        );
        closeDeleteModal();
      } else {
        setError(result.error || 'Failed to delete booking');
      }
    } catch (error) {
      setError('Network error - please try again');
    } finally {
      setIsDeletingBooking(false);
    }
  };

  return (
    <VStack gap={6} align='stretch'>
      <Heading
        as='h2'
        size={{ base: 'lg', md: 'xl' }}
        color={isDarkMode ? 'gray.100' : 'gray.800'}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Manage My Bookings
      </Heading>

      <Text
        color={isDarkMode ? 'gray.300' : 'gray.600'}
        fontSize={{ base: 'md', md: 'lg' }}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Enter your email address to view and manage your appointments
      </Text>

      <BookingSearchForm
        email={email}
        isLoading={isLoading}
        onEmailChange={setEmail}
        onSearch={handleSearchBookings}
      />

      {/* Error Message */}
      {error && (
        <Box
          p={4}
          bg={isDarkMode ? 'red.900' : 'red.50'}
          borderRadius='md'
          border='1px'
          borderColor={isDarkMode ? 'red.700' : 'red.200'}
        >
          <HStack gap={2}>
            <AlertCircle size={20} color={isDarkMode ? '#FCA5A5' : '#DC2626'} />
            <Text color={isDarkMode ? 'red.200' : 'red.700'} fontSize='sm'>
              {error}
            </Text>
          </HStack>
        </Box>
      )}

      {/* Bookings List */}
      {bookings.length > 0 && (
        <VStack gap={3} align='stretch'>
          <Text
            fontSize='sm'
            fontWeight='semibold'
            color={isDarkMode ? 'gray.400' : 'gray.600'}
            textTransform='uppercase'
            letterSpacing='wide'
          >
            Your Bookings ({bookings.length})
          </Text>
          {bookings.map((booking) => (
            <BookingListItem
              key={booking.id}
              booking={booking}
              onDelete={openDeleteModal}
            />
          ))}
        </VStack>
      )}

      {/* Loading State */}
      {isLoading && bookings.length === 0 && !error && (
        <Center py={8}>
          <VStack gap={3}>
            <Spinner size='lg' color={isDarkMode ? 'blue.300' : 'blue.500'} />
            <Text color={isDarkMode ? 'gray.400' : 'gray.500'}>
              Searching for bookings...
            </Text>
          </VStack>
        </Center>
      )}

      <DeleteBookingModal
        isOpen={isOpen}
        booking={selectedBooking}
        isDeleting={isDeletingBooking}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteBooking}
      />
    </VStack>
  );
};

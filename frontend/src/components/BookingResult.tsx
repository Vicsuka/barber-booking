import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Booking } from '../types';

interface BookingResultProps {
  result: {
    type: 'success' | 'error';
    message: string;
    booking?: Booking;
  };
  onStartNewBooking: () => void;
  onTryAgain?: () => void;
}

export const BookingResult: React.FC<BookingResultProps> = ({
  result,
  onStartNewBooking,
  onTryAgain,
}) => {
  const { isDarkMode } = useDarkMode();

  const successBg = isDarkMode ? 'green.900' : 'green.50';
  const successBorder = isDarkMode ? 'green.600' : 'green.200';
  const errorBg = isDarkMode ? 'red.900' : 'red.50';
  const errorBorder = isDarkMode ? 'red.600' : 'red.200';

  return (
    <Box
      bg={result.type === 'success' ? successBg : errorBg}
      borderColor={result.type === 'success' ? successBorder : errorBorder}
      borderWidth='1px'
      borderRadius='lg'
      p={{ base: 4, md: 6 }}
    >
      <HStack mb={4}>
        {result.type === 'success' ? (
          <CheckCircle color='green' size={24} />
        ) : (
          <AlertTriangle color='red' size={24} />
        )}
        <Heading
          fontSize={{ base: 'lg', md: 'xl' }}
          color={
            result.type === 'success'
              ? isDarkMode
                ? 'green.200'
                : 'green.800'
              : isDarkMode
              ? 'red.200'
              : 'red.800'
          }
        >
          {result.type === 'success' ? 'Booking Confirmed!' : 'Booking Failed'}
        </Heading>
      </HStack>

      <Text
        fontSize={{ base: 'md', md: 'lg' }}
        mb={4}
        color={
          result.type === 'success'
            ? isDarkMode
              ? 'green.300'
              : 'green.700'
            : isDarkMode
            ? 'red.300'
            : 'red.700'
        }
      >
        {result.message}
      </Text>

      {result.booking && (
        <Box
          bg={isDarkMode ? 'gray.800' : 'white'}
          borderColor={isDarkMode ? 'green.600' : 'green.300'}
          borderWidth={1}
          mb={4}
          w='full'
          borderRadius='md'
          p={4}
        >
          <Heading
            size='sm'
            color={isDarkMode ? 'gray.200' : 'gray.800'}
            mb={3}
          >
            Booking Details
          </Heading>
          <VStack
            align='stretch'
            gap={2}
            fontSize='sm'
            color={isDarkMode ? 'gray.400' : 'gray.600'}
          >
            <HStack>
              <Text fontWeight='bold'>Booking ID:</Text>
              <Badge colorScheme='blue' fontSize='xs'>
                {result.booking.id}
              </Badge>
            </HStack>
            <HStack>
              <Text fontWeight='bold'>Email:</Text>
              <Text>{result.booking.customerEmail}</Text>
            </HStack>
            <HStack>
              <Text fontWeight='bold'>Status:</Text>
              <Badge
                colorScheme='green'
                fontSize='xs'
                textTransform='capitalize'
              >
                {result.booking.status}
              </Badge>
            </HStack>
          </VStack>
        </Box>
      )}

      {result.type === 'success' && (
        <Button
          onClick={onStartNewBooking}
          bg={isDarkMode ? 'blue.600' : 'blue.500'}
          color='white'
          _hover={{ bg: isDarkMode ? 'blue.500' : 'blue.600' }}
          size={{ base: 'md', md: 'lg' }}
          width={{ base: 'full', sm: 'auto' }}
        >
          Book Another Appointment
        </Button>
      )}

      {result.type === 'error' && (
        <HStack
          gap={3}
          width={{ base: 'full', sm: 'auto' }}
          flexDirection={{ base: 'column', sm: 'row' }}
        >
          <Button
            onClick={onTryAgain || onStartNewBooking}
            bg={isDarkMode ? 'red.600' : 'red.500'}
            color='white'
            _hover={{ bg: isDarkMode ? 'red.500' : 'red.600' }}
            size={{ base: 'md', md: 'lg' }}
            flex={1}
          >
            Try Again
          </Button>
          {onTryAgain && (
            <Button
              onClick={onStartNewBooking}
              variant='outline'
              bg={isDarkMode ? 'gray.800' : 'white'}
              borderColor={isDarkMode ? 'gray.500' : 'gray.300'}
              color={isDarkMode ? 'gray.300' : 'gray.700'}
              _hover={{
                bg: isDarkMode ? 'gray.600' : 'gray.50',
                borderColor: isDarkMode ? 'gray.300' : 'gray.400',
              }}
              size={{ base: 'md', md: 'lg' }}
              flex={1}
            >
              Start Over
            </Button>
          )}
        </HStack>
      )}
    </Box>
  );
};

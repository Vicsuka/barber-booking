import React from 'react';
import {
  Box,
  VStack,
  Text,
  Input,
  Button,
  HStack,
  Spinner,
} from '@chakra-ui/react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface BookingSearchFormProps {
  email: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onSearch: () => void;
}

export const BookingSearchForm: React.FC<BookingSearchFormProps> = ({
  email,
  isLoading,
  onEmailChange,
  onSearch,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      bg={isDarkMode ? 'gray.800' : 'white'}
      p={6}
      borderRadius='lg'
      border='1px'
      borderColor={isDarkMode ? 'gray.700' : 'gray.200'}
      shadow='sm'
    >
      <VStack gap={4} align='stretch'>
        <Box>
          <Text
            fontSize='sm'
            fontWeight='medium'
            color={isDarkMode ? 'gray.300' : 'gray.700'}
            mb={2}
          >
            Email Address
          </Text>
          <Input
            type='email'
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder='Enter your email address'
            bg={isDarkMode ? 'gray.700' : 'white'}
            borderColor={isDarkMode ? 'gray.600' : 'gray.300'}
            color={isDarkMode ? 'white' : 'gray.900'}
            _placeholder={{
              color: isDarkMode ? 'gray.400' : 'gray.500',
            }}
            size='lg'
            _focus={{
              borderColor: 'blue.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-500)',
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
          />
        </Box>

        <Button
          onClick={onSearch}
          disabled={isLoading || !email.trim()}
          bg={isDarkMode ? 'blue.600' : 'blue.500'}
          color='white'
          _hover={{ bg: isDarkMode ? 'blue.500' : 'blue.600' }}
          _disabled={{
            bg: isDarkMode ? 'gray.600' : 'gray.300',
            color: isDarkMode ? 'gray.400' : 'gray.500',
          }}
          size='lg'
        >
          {isLoading ? (
            <HStack gap={2}>
              <Spinner size='sm' color='white' />
              <Text>Searching...</Text>
            </HStack>
          ) : (
            'Search Bookings'
          )}
        </Button>
      </VStack>
    </Box>
  );
};

'use client';

import React from 'react';
import {
  Heading,
  SimpleGrid,
  Button,
  VStack,
  Text,
  Box,
  HStack,
} from '@chakra-ui/react';
import { CheckCircle } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const { isDarkMode } = useDarkMode();
  // Define color variables
  const selectedBg = isDarkMode ? 'blue.700' : 'blue.50';
  const defaultBg = isDarkMode ? 'gray.700' : 'white';
  const selectedBorder = isDarkMode ? 'blue.400' : 'blue.500';
  const defaultBorder = isDarkMode ? 'gray.600' : 'gray.200';
  const hoverBg = isDarkMode ? 'gray.600' : 'gray.50';

  // Generate next 14 days (2 weeks)
  const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const dates = generateDates();

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.toDateString() === date2.toDateString();
  };

  return (
    <VStack gap={6} align='stretch'>
      <Heading
        as='h3'
        size={{ base: 'md', md: 'lg' }}
        color={isDarkMode ? 'gray.200' : 'gray.800'}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Select a Date
      </Heading>

      <SimpleGrid columns={{ base: 2, sm: 3, md: 7 }} gap={{ base: 2, md: 3 }}>
        {dates.map((date, index) => (
          <Button
            key={index}
            onClick={() => onDateSelect(date)}
            variant='outline'
            bg={
              isSameDate(selectedDate, date)
                ? isDarkMode
                  ? 'blue.800'
                  : selectedBg
                : isDarkMode
                ? 'gray.700'
                : defaultBg
            }
            borderColor={
              isSameDate(selectedDate, date)
                ? selectedBorder
                : isDarkMode
                ? 'gray.600'
                : defaultBorder
            }
            color={
              isSameDate(selectedDate, date)
                ? isDarkMode
                  ? 'blue.300'
                  : 'blue.700'
                : isDarkMode
                ? 'gray.300'
                : 'gray.700'
            }
            _hover={{
              bg: isSameDate(selectedDate, date) ? selectedBg : hoverBg,
              borderColor: isSameDate(selectedDate, date)
                ? selectedBorder
                : isDarkMode
                ? 'gray.500'
                : 'gray.300',
            }}
            h={{ base: '16', md: '20' }}
            p={3}
            position='relative'
            overflow='visible'
            boxShadow={
              isToday(date) ? '0 0 0 2px var(--chakra-colors-blue-200)' : 'none'
            }
          >
            <VStack gap={1}>
              <Text fontSize='xs' color={isDarkMode ? 'gray.400' : 'gray.500'}>
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </Text>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight='medium'
                color={
                  isSameDate(selectedDate, date)
                    ? isDarkMode
                      ? 'blue.300'
                      : 'blue.700'
                    : isDarkMode
                    ? 'gray.200'
                    : 'gray.700'
                }
              >
                {date.getDate()}
              </Text>
              {isToday(date) && (
                <Text
                  fontSize='xs'
                  color={isDarkMode ? 'blue.300' : 'blue.600'}
                  fontWeight='bold'
                >
                  Today
                </Text>
              )}
            </VStack>
          </Button>
        ))}
      </SimpleGrid>

      {selectedDate && (
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
              Selected:{' '}
              {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
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


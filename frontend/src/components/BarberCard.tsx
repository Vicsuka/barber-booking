import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Badge,
} from '@chakra-ui/react';
import { CheckIcon } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Barber } from '../types';

interface BarberCardProps {
  barber: Barber;
  onSelect: (barber: Barber) => void;
  isSelected?: boolean;
}

export const BarberCard: React.FC<BarberCardProps> = ({
  barber,
  onSelect,
  isSelected = false,
}) => {
  const { isDarkMode } = useDarkMode();
  const selectedBg = isDarkMode ? 'blue.900' : 'blue.50';
  const selectedBorder = isDarkMode ? 'blue.400' : 'blue.500';
  const defaultBg = isDarkMode ? 'gray.700' : 'white';
  const defaultBorder = isDarkMode ? 'gray.600' : 'gray.200';
  const hoverBorder = isDarkMode ? 'gray.500' : 'gray.300';

  const formatWorkDay = (day: keyof Barber['workSchedule']) => {
    const schedule = barber.workSchedule[day];
    if (!schedule.start || !schedule.end) return 'Closed';
    return `${schedule.start} - ${schedule.end}`;
  };

  const workingDays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ] as const;

  return (
    <Box
      as='button'
      bg={isSelected ? selectedBg : defaultBg}
      borderColor={isSelected ? selectedBorder : defaultBorder}
      borderWidth={2}
      cursor='pointer'
      transition='all 0.2s'
      _hover={{
        borderColor: isSelected ? selectedBorder : hoverBorder,
        shadow: isSelected ? 'md' : 'sm',
      }}
      onClick={() => onSelect(barber)}
      position='relative'
      overflow='hidden'
      borderRadius='lg'
      p={{ base: 4, md: 6 }}
      width='full'
    >
      <VStack gap={4} align='stretch'>
        <HStack justify='space-between' align='flex-start'>
          <VStack align='flex-start' gap={1} flex={1}>
            <Heading
              as='h3'
              size={{ base: 'sm', md: 'md' }}
              color={
                isSelected
                  ? isDarkMode
                    ? 'blue.300'
                    : 'blue.700'
                  : isDarkMode
                  ? 'gray.200'
                  : 'gray.800'
              }
            >
              {barber.name}
            </Heading>
            <Badge colorScheme='blue' size='sm' variant='subtle'>
              Professional Barber
            </Badge>
          </VStack>

          {isSelected && <CheckIcon color='blue' size={24} />}
        </HStack>

        <Box>
          <Text
            fontSize='sm'
            fontWeight='medium'
            color={isDarkMode ? 'gray.300' : 'gray.700'}
            mb={3}
          >
            Working Hours:
          </Text>
          <Grid templateColumns='repeat(2, 1fr)' gap={2}>
            {workingDays.slice(0, 6).map((day) => (
              <GridItem key={day}>
                <HStack justify='space-between' fontSize='xs'>
                  <Text
                    color={isDarkMode ? 'gray.400' : 'gray.600'}
                    textTransform='capitalize'
                  >
                    {day.slice(0, 3)}:
                  </Text>
                  <Text
                    color={isDarkMode ? 'gray.200' : 'gray.800'}
                    fontWeight='medium'
                  >
                    {formatWorkDay(day)}
                  </Text>
                </HStack>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

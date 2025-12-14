import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Alert,
  AlertDescription,
  Button,
  VStack,
  Center,
} from '@chakra-ui/react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { apiService } from '../services/api';
import { BarberCard } from './BarberCard';
import { useDarkMode } from '../contexts/DarkModeContext';
import type { Barber } from '../types';

interface BarberSelectionProps {
  onBarberSelect: (barber: Barber | null) => void;
  selectedBarber: Barber | null;
}

export const BarberSelection: React.FC<BarberSelectionProps> = ({
  onBarberSelect,
  selectedBarber,
}) => {
  const { isDarkMode } = useDarkMode();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getBarbers();

      if (response.success && response.data) {
        setBarbers(response.data);
      } else {
        setError(response.error || 'Failed to load barbers');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleBarberSelect = (barber: Barber) => {
    if (selectedBarber?.id === barber.id) {
      onBarberSelect(null); // Deselect if already selected
    } else {
      onBarberSelect(barber);
    }
  };

  if (loading) {
    return (
      <Center py={8}>
        <VStack gap={4}>
          <Spinner size='xl' color='blue.500' />
          <Box textAlign='center' color='gray.600'>
            Loading barbers...
          </Box>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={8}>
        <VStack gap={4} textAlign='center'>
          <Alert.Root status='error' borderRadius='md' maxW='md'>
            <AlertTriangle size={20} color='red' />
            <AlertDescription fontSize={{ base: 'sm', md: 'md' }}>
              {error}
            </AlertDescription>
          </Alert.Root>
          <Button
            onClick={loadBarbers}
            bg={isDarkMode ? 'blue.600' : 'blue.500'}
            color='white'
            _hover={{ bg: isDarkMode ? 'blue.500' : 'blue.600' }}
            size={{ base: 'md', md: 'lg' }}
          >
            Try Again
          </Button>
        </VStack>
      </Center>
    );
  }

  if (barbers.length === 0) {
    return (
      <Center py={8}>
        <Box
          textAlign='center'
          color='gray.500'
          fontSize={{ base: 'md', md: 'lg' }}
        >
          No barbers available at the moment.
        </Box>
      </Center>
    );
  }

  return (
    <Box>
      <Heading
        as='h2'
        size={{ base: 'md', md: 'lg' }}
        color='gray.800'
        mb={6}
        textAlign={{ base: 'center', md: 'left' }}
      >
        Choose Your Barber ({barbers.length} available)
      </Heading>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={{ base: 4, md: 6 }}
        w='full'
      >
        {barbers.map((barber) => (
          <BarberCard
            key={barber.id}
            barber={barber}
            onSelect={handleBarberSelect}
            isSelected={selectedBarber?.id === barber.id}
          />
        ))}
      </SimpleGrid>

      {selectedBarber && (
        <Box
          mt={6}
          p={4}
          bg='green.50'
          border='1px'
          borderColor='green.200'
          borderRadius='md'
        >
          <Box color='green.800'>
            <CheckCircle
              size={16}
              style={{ display: 'inline', marginRight: '8px' }}
            />
            Selected: <Box as='strong'>{selectedBarber.name}</Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

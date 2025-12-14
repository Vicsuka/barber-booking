import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
} from '@chakra-ui/react';
import { BookingWizard } from './components/BookingWizard';
import { BookingManagement } from './components/BookingManagement';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { DarkModeToggle } from './components/DarkModeToggle';

type ActiveTab = 'book' | 'manage';

const AppContent = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState<ActiveTab>('book');

  return (
    <Box
      minH='100vh'
      bg={isDarkMode ? 'gray.900' : 'gray.50'}
      transition='background-color 0.2s'
    >
      {/* Header */}
      <Box bg={isDarkMode ? 'gray.800' : 'blue.600'} color='white' shadow='lg'>
        <Container maxW='6xl' px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
          <HStack justify='space-between' align='start' mb={6}>
            <VStack
              gap={4}
              align={{ base: 'center', md: 'flex-start' }}
              flex={1}
            >
              <Heading
                as='h1'
                size={{ base: 'xl', md: '2xl' }}
                fontWeight='bold'
                letterSpacing='tight'
              >
                Barber Booking System
              </Heading>
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                opacity={0.9}
                maxW='2xl'
                textAlign={{ base: 'center', md: 'left' }}
              >
                {activeTab === 'book'
                  ? 'Book your appointment with our professional barbers. Choose your preferred barber, date, and time slot.'
                  : 'Manage your existing appointments. View and cancel your bookings.'}
              </Text>
            </VStack>
            <DarkModeToggle />
          </HStack>

          {/* Navigation Tabs */}
          <HStack gap={4} justify={{ base: 'center', md: 'flex-start' }}>
            <Button
              onClick={() => setActiveTab('book')}
              variant={activeTab === 'book' ? 'solid' : 'outline'}
              bg={activeTab === 'book' ? 'white' : 'transparent'}
              color={activeTab === 'book' ? 'blue.600' : 'white'}
              borderColor='white'
              _hover={{
                bg: activeTab === 'book' ? 'gray.100' : 'whiteAlpha.200',
                color: activeTab === 'book' ? 'blue.700' : 'white',
              }}
              size={{ base: 'sm', md: 'md' }}
            >
              Book Appointment
            </Button>
            <Button
              onClick={() => setActiveTab('manage')}
              variant={activeTab === 'manage' ? 'solid' : 'outline'}
              bg={activeTab === 'manage' ? 'white' : 'transparent'}
              color={activeTab === 'manage' ? 'blue.600' : 'white'}
              borderColor='white'
              _hover={{
                bg: activeTab === 'manage' ? 'gray.100' : 'whiteAlpha.200',
                color: activeTab === 'manage' ? 'blue.700' : 'white',
              }}
              size={{ base: 'sm', md: 'md' }}
            >
              Manage Bookings
            </Button>
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW='6xl' px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
        {activeTab === 'book' ? <BookingWizard /> : <BookingManagement />}
      </Container>
    </Box>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

export default App;

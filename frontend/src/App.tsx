import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { BookingWizard } from './components/BookingWizard';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';
import { DarkModeToggle } from './components/DarkModeToggle';

const AppContent = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <Box
      minH='100vh'
      bg={isDarkMode ? 'gray.900' : 'gray.50'}
      transition='background-color 0.2s'
    >
      {/* Header */}
      <Box bg={isDarkMode ? 'gray.800' : 'blue.600'} color='white' shadow='lg'>
        <Container maxW='6xl' px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }}>
          <HStack justify='space-between' align='start' mb={4}>
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
                Book your appointment with our professional barbers. Choose your
                preferred barber, date, and time slot.
              </Text>
            </VStack>
            <DarkModeToggle />
          </HStack>
        </Container>
      </Box>

      {/* Main Content */}
      <BookingWizard />
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

import React from 'react';
import { Button } from '@chakra-ui/react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../contexts/DarkModeContext';

export const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Button
      onClick={toggleDarkMode}
      bg={isDarkMode ? 'whiteAlpha.200' : 'whiteAlpha.200'}
      color={isDarkMode ? 'yellow.300' : 'gray.100'}
      size='sm'
      aria-label='Toggle dark mode'
      _hover={{
        bg: isDarkMode ? 'whiteAlpha.300' : 'whiteAlpha.300',
        transform: 'scale(1.05)',
      }}
      _active={{
        transform: 'scale(0.95)',
      }}
      transition='all 0.2s'
      borderRadius='lg'
    >
      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

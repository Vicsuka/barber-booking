import type { Metadata } from 'next';
import { ChakraProvider } from '@chakra-ui/react';
import { DarkModeProvider } from '@/contexts/DarkModeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Barber Booking System',
  description: 'Book your appointment with our professional barbers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ChakraProvider>
          <DarkModeProvider>{children}</DarkModeProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}

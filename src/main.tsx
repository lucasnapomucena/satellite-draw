
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'ol/ol.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme';
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={theme}>
      <App />
      <Analytics />
    </ChakraProvider>
);

import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './navigation/Router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { createRoot } from 'react-dom/client';

const root = createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

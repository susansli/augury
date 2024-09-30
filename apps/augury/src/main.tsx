import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './navigation/router';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);

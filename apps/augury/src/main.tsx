import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import App from './app/app';
import theme from './theme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);

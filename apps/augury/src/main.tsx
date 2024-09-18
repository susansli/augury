import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  ChakraBaseProvider,
  extendBaseTheme,
  theme as chakraTheme,
} from '@chakra-ui/react';
import App from './app/app';

const { Button } = chakraTheme.components;

// Add components to base theme ONLY as needed
const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
  </StrictMode>
);

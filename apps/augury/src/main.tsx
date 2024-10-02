import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme';
import { createRoot } from 'react-dom/client';
import router from './navigation/router';
import { RecoilRoot } from 'recoil';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <RecoilRoot>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </RecoilRoot>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SnackbarProvider } from 'notistack';

const RootComponent = () => (
  <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
    <App />
  </SnackbarProvider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);

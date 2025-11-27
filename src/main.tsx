import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize';
import './global.css';
import { 
  QueryClient, 
  QueryClientProvider 
} from '@tanstack/react-query';
import App from './App.tsx';
import ThemeProvider from './components/ThemeProvider/ThemeProvider.tsx';
import AuthProvider from './components/AuthProvider/AuthProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)

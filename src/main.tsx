import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './app/store';
import { ThemeProvider } from './features/theme/ThemeContext';
import './styles.css';

const container = document.getElementById('root');
if (container === null) {
  throw new Error('Không tìm thấy phần tử #root');
}

createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);

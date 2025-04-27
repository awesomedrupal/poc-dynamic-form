import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormDataProvider } from './context/FormDataContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormDataProvider>
      <App />
    </FormDataProvider>
  </StrictMode>,
)

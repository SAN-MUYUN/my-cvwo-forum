import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications'


createRoot(document.getElementById('root')!).render(
  <MantineProvider>
    <Notifications/>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>
)

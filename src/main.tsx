import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.ts'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

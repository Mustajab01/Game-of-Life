import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GameOfLifeProvider } from './context/GameOfLifeContext.jsx';
import App from './App.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameOfLifeProvider>
      <App />
    </GameOfLifeProvider>
  </StrictMode>,
)

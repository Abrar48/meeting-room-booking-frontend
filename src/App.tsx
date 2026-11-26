import { BrowserRouter } from 'react-router'
import AuthProvider from './context/AuthProvider'
import AppRoutes from './routes/AppRoutes'

import './App.css'
import './styles/theme.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
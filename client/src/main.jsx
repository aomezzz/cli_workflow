import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home'
import AddRestaurant from './Pages/AddRestaurant'
import router from './Routes/Routes'
import { RouterProvider } from 'react-router-dom'
import UpdateRestaurant from './Pages/UpdateRestaurant'
import { AuthProvider } from './contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
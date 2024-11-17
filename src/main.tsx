import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StorageContext } from './store/storageContext.tsx';
import './firebaseConfig.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StorageContext>
      <App />
    </StorageContext>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
      />
  </StrictMode>,
)

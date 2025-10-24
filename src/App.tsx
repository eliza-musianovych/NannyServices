import css from './App.module.css';

import clsx from 'clsx';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import Home from './pages/Home';
import Nannies from './pages/Nannies';
import Favorites from './pages/Favorites';
import { useState } from 'react';
import AuthModal from './components/AuthModal/AuthModal';

function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [modalMode, setModalMode] = useState<'login' | 'register' | null>(null);

  const openLogin = () => setModalMode('login');
  const openRegister = () => setModalMode('register');
  const closeModal = () => setModalMode(null);

  return (
    <div className={clsx(isHome && css.container)}>
      <Header 
      onLoginClick={openLogin} 
      onRegisterClick={openRegister} 
      isHome={isHome}
      />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/nannies' element={<Nannies />} />
          <Route path='/favorites' element={<Favorites />}/>
        </Routes>
      </main>

      {modalMode && 
      <AuthModal 
      mode={modalMode} 
      onClose={closeModal}
      />
      }
    </div>
  )
}

export default App

'use client';
import '../style.css'
import { useState } from 'react';
import Login from './auth/login';

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="logo.png" alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login"onClick={() => setIsModalOpen(true)}>Login</li>
          <Login 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  )
}

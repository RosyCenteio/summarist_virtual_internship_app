'use client';
import '../style.css'
import { useState } from 'react';
import Login from './auth/login';
import Link from 'next/link';

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

        <Link href="/for-you">
          <button className="nav__btn">For You</button>
        </Link>
      </div>
    </nav>
  )
}

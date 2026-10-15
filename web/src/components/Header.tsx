"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="header-container">
        <Link href="/" className="logo">
          <Image src="/images/logo-header.jpg" alt="Empireo Holidays" className="logo-image" width={160} height={48} />
        </Link>

        <nav className={`nav${isMenuOpen ? " active" : ""}`}>
          <Link href="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>
            About Us
          </Link>
          <Link href="/international" className="nav-link" onClick={closeMenu}>
            International
          </Link>
          <Link href="/domestic" className="nav-link" onClick={closeMenu}>
            Domestic
          </Link>
          <Link href="/contact" className="nav-link" onClick={closeMenu}>
            Contact Us
          </Link>
        </nav>

        <div className="header-actions">
          <Link href="/contact" className="btn-inquiry">
            Inquiry Now
          </Link>
          <button
            className={`menu-toggle${isMenuOpen ? " active" : ""}`}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

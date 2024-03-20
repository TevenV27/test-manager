// src/app/layout.js
'use client'
import { useEffect, useState } from 'react';
import { Theme } from '@radix-ui/themes';
import SetTheme from '@/components/SetTheme';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  // Inicializa el tema desde localStorage o usa "light" como tema predeterminado
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  // Función para cambiar el tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Actualiza localStorage cuando el tema cambia
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme className={`${theme === 'light' ? 'light' : 'dark'} bg-background`}>
          <SetTheme theme={theme} toggleTheme={toggleTheme} /> {/* Pasar theme y toggleTheme como props */}
          {children}
        </Theme>
      </body>
    </html>
  );
}

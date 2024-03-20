// src/components/SetTheme.js
import { FaMoon } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa6';

export default function SetTheme({ theme, toggleTheme }) {
  return (
    <>
      {theme === 'light' ? (
        <FaMoon onClick={toggleTheme} className="absolute top-5 right-5 cursor-pointer z-50 select-none" />
      ) : (
        <FaSun onClick={toggleTheme} className="absolute top-5 right-5 cursor-pointer z-50 select-none" />
      )}
    </>
  );
}

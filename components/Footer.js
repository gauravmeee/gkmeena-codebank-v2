// components/Footer.js
import Link from 'next/link';
import { ModeToggle } from './theme-btn';

const Footer = () => {
  return (
    <footer className="p-4 bg-background/50 sticky bottom-0 backdrop-blur border-t z-10">
      <div className="container mx-auto flex justify-center items-center">
        {/* Footer Content Centered */}
        <div className="text-center">
          <div className="text-lg font-bold">
            HackDeck &copy; {new Date().getFullYear()} - All Rights Reserved
          </div>
          <div className="text-sm mt-2">
            <p>Licensed under <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MIT License</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

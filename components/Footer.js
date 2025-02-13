// components/Footer.js
import Link from 'next/link';
import { ModeToggle } from './theme-btn';

const Footer = () => {
  return (
    <footer className="p-4 bg-background/50 sticky bottom-0 backdrop-blur border-t z-10">
      <div className="container mx-auto flex justify-center items-center">
        {/* Footer Content Centered */}
        <div className="text-center">
          <div className="text-sm md:text-lg">
            Copyright &copy; {new Date().getFullYear()} CodeBank
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// components/Footer.js
import Link from 'next/link';
import { ModeToggle } from './theme-btn';

const Footer = () => {
  return (
    <footer className="p-4 bg-background/50 sticky bottom-0 backdrop-blur border-t z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Desktop Footer Items */}
        <div className="flex flex-col items-center md:items-start">
          <div className="text-2xl font-bold">
            HackDeck &copy; {new Date().getFullYear()}
          </div>
          <div className="mt-2 flex space-x-4">
            <Link href="/" className="hover:scale-105 hover:font-semibold transition-transform duration-300">Home</Link>
            <Link href="/notes" className="hover:scale-105 hover:font-semibold transition-transform duration-300">Notes</Link>
            <Link href="/contests" className="hover:scale-105 hover:font-semibold transition-transform duration-300">Contests</Link>
            <Link href="/jobs" className="hover:scale-105 hover:font-semibold transition-transform duration-300">Jobs</Link>
          </div>
        </div>

        {/* Theme Toggle for Footer */}
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

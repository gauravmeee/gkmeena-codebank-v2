// components/Footer.js


const Footer = () => {
  return (
    <footer className="p-4 bg-background/50 border-t mt-auto">
      <div className="container mx-auto flex flex-col justify-center items-center space-y-2">
        {/* Footer Content Centered */}
        <div className="text-center">
          <div className="text-sm md:text-lg">
            Copyright &copy; {new Date().getFullYear()} CodeBank
          </div>
        </div>
        {/* Know More Links */}
        <div className="flex space-x-2 text-sm">
          <a 
            href="https://gkmeena.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Know Me
          </a>
          <span>|</span>
          <a 
            href="https://my-unseen-stories.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Unseen Stories
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

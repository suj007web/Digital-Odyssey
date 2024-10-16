import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Linkedin, Twitter, Youtube } from "lucide-react"; // Correct imports for icons

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-4 md:px-10">
        
        {/* Footer Title and Text */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Digital Odyssey</h2>
          <p className="text-sm">© 2024 All Rights Reserved</p>
        </div>
        
        {/* Social Media Links */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Link to="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="text-white flex items-center">
              <Linkedin className="mr-1" /> LinkedIn
            </Button>
          </Link>
          <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="text-white flex items-center">
              <Twitter className="mr-1" /> Twitter
            </Button>
          </Link>
          <Link to="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <Button variant="link" className="text-white flex items-center">
              <Youtube className="mr-1" /> YouTube
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;

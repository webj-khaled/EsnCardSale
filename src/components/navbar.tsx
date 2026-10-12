import { useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg py-2"
          : "bg-white/80 py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo on the right */}
        <div className="flex items-center">
          <div className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
            ESN
          </div>
          <span className="ml-3 text-xl font-bold text-blue-800 ">
            Salzburg
          </span>
        </div>

        {/* WhatsApp and Instagram on the left */}
        <div className="flex items-center space-x-5">
          <a
            href="https://chat.whatsapp.com/FvzKAEVNJRm7q4iSN8MsB2"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Contact via WhatsApp"
          >
            <FaWhatsapp size={26} className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/esn_salzburg/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Follow on Instagram"
          >
            <FaInstagram size={26} className="w-6 h-6" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
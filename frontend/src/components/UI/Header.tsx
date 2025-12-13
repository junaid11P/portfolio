import { useState } from 'react';
import { FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Projects', href: '#projects' },
        { name: 'About', href: '#about' }, // Assuming we might add an ID for about later, or just scroll top
        { name: 'Contact', href: 'mailto:Muhammadjunaid8105@gmail.com' },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-transparent pointer-events-none">
            {/* Glass Background Container for maximizing visibility while keeping it floaty */}
            <div className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'bg-black/80 backdrop-blur-md' : 'bg-gradient-to-b from-black/50 to-transparent pointer-events-none'}`}></div>

            {/* Logo */}
            <div className="relative z-50 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-300 pointer-events-auto cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                Juned<span className="text-white">.dev</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex relative z-50 gap-8 pointer-events-auto">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-white/80 hover:text-primary font-medium transition-colors text-sm uppercase tracking-wider relative group"
                    >
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </a>
                ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden relative z-50 pointer-events-auto">
                <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-primary transition-colors">
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden z-40 pointer-events-auto ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-2xl text-white/90 hover:text-primary font-bold transition-colors"
                    >
                        {link.name}
                    </a>
                ))}

                <div className="flex gap-6 mt-8">
                    <a href="https://github.com/junaid11P" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors"><FaGithub size={28} /></a>
                    <a href="https://linkedin.com/in/juned11" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-blue-400 transition-colors"><FaLinkedin size={28} /></a>
                </div>
            </div>
        </header>
    );
};

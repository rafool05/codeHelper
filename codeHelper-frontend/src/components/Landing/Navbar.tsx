import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import { Button } from '../../ui/Button';
const navLinks = [
  { href: "hero", label: "Home" },
  { href: "direction", label: "Get Started" },
  { href: "features", label: "Features" },
  { href: "techstack", label: "Tech Stack" },
  { href: "about", label: "About Me" },
  { href: "footer", label: "Contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-950/90 z-50 backdrop-blur">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className='flex gap-2 items-center'>

          <span><img className="w-12" src = {logo}></img></span>
          <span className="font-bold text-xl text-yellow-400">ScryptSync</span>
        </div>
        <ul className="flex gap-6 items-center">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                activeClass="text-yellow-400"
                to={link.href}
                spy={true}
                smooth={true}
                offset={-64} // Adjust if navbar height changes
                duration={500}
                className="cursor-pointer text-gray-100 hover:text-yellow-400 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Button
              onClick={() => navigate("/signup")}
              variant="pos-cta"
              size="md"
              className="ml-4"
            >
              Get Started
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

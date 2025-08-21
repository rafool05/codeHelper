import { Link } from 'react-scroll';
import logo from "../../assets/logo.png"
const navLinks = [
  { href: "hero", label: "Home" },
  { href: "direction", label: "Get Started" },
  { href: "features", label: "Features" },
  { href: "techstack", label: "Tech Stack" },
  { href: "about", label: "About Me" },
  { href: "footer", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-950/90 z-50 backdrop-blur">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <div className='flex gap-4 items-center'>

          <span><img className="w-[60px]" src = {logo}></img></span>
          <span className="font-bold text-xl text-yellow-400">LiveCollabCode</span>
        </div>
        <ul className="flex gap-6 items-center">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                activeClass="text-yellow-400"
                to={link.href}
                spy={true}
                smooth={true}
                offset={-76} // Adjust if navbar height changes
                duration={500}
                className="cursor-pointer text-gray-100 hover:text-yellow-400 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => window.location.href = "/signup"} // Replace with your signup route
              className="ml-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-5 rounded transition"
            >
              Get Started
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

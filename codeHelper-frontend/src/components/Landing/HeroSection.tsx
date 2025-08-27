import hero from '../../assets/hero.png'
import { Link } from "react-scroll";

export default function HeroSection() {
  return (
    <section id="hero" className="flex flex-col md:flex-row justify-between items-center pt-40 pb-30 px-8 md:px-16 bg-primary-900 ">
      <div className="max-w-md">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-50 mb-6">
          Real-time Collaborative Code Editing
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          A modern collaborative code editor supporting real-time sync, multiple languages, seamless session management, and robust admin controls. Work together, faster.
        </p>
        <Link to="features" 
            spy={true}
            smooth={true}
            offset={-64} // Adjust if navbar height changes
            duration={500}
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-3 px-8 rounded transition">
          Explore Features
        </Link>
      </div>
      <div className="md:ml-10 mt-12 md:mt-0 w-full md:w-1/2">
        <div className="h-64  flex items-center justify-center">
          <img  className = "rounded-lg shadow-[0_12px_16px_-22px] shadow-secondary-800" src = {hero}/>
        </div>
      </div>
    </section>
  );
}

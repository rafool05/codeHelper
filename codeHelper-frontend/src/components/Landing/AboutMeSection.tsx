import profilePic from "../../assets/profile.jpeg"
export default function AboutMeSection() {
  return (
    <section id="about" className="py-16 bg-primary-900">
      <div className="container w-20px mx-auto px-4 gap-8 flex flex-col md:flex-row items-center">
        <img className = "w-sm h-sm rounded-full" src = {profilePic}/>
        <div> 
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">About Me</h2>
          <p className="text-gray-300 mb-2">
            I’m a passionate full stack developer experienced with collaborative web technology, real-time systems, and robust backend architecture. I built this project adhering to best practices in maintainability, accessibility, and responsive design, with a focus on creating seamless, intuitive user experiences for developers. Driven by curiosity and the desire to make coding more collaborative and fun!
          </p>
          <p className="text-gray-300">
            When not building web apps, I solve algorithmic problems and contribute to open-source.
          </p>
        </div>
      </div>
    </section>
  );
}

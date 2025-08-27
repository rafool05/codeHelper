const features = [
  { title: "Live Collaborative Coding", desc: "Edit code together in real time across devices." },
  { title: "Compiler Integration", desc: "Run and compile code directly in the editor." },
  { title: "Admin Permissions", desc: "Admins can allow or restrict member edit access." },
  { title: "Code Download", desc: "Download your code files anytime." },
  { title: "Multi-Language Support", desc: "Work with multiple programming languages." },
  { title: "Multiple Rooms", desc: "Host separate rooms for different problems." },
  { title: "Room History", desc: "Keep track of all joined rooms easily." },
];
const upcoming = [
  "Voice Chat Integration",
  "Multiple Code Editors within Same Room"
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-12 bg-primary-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8">Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.title} className="p-6 rounded-md bg-primary-800 shadow text-gray-100">
              <h3 className="font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <h4 className="text-xl font-semibold text-gray-50 mb-2">Upcoming</h4>
          <ul className="list-disc list-inside text-gray-300">
            {upcoming.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

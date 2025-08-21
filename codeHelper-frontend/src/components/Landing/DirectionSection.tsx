const steps = [
  { step: "Step 1", title: "Admin Shares Room ID", desc: "Admin creates a room and shares the Room ID." },
  { step: "Step 2", title: "Join Room", desc: "Members join the room using the Room ID." },
  { step: "Step 3", title: "Start Collaboration", desc: "Begin real-time collaboration!" }
];

export default function DirectionSection() {
  return (
    <section id="direction" className="py-16 bg-primary-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map(({ step, title, desc }) => (
            <div 
              key={step} 
              className="bg-primary-950 p-6 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="mb-4 h-32 bg-primary-600 rounded flex items-center justify-center text-yellow-400">
                {/* Visual placeholder */}
                <span>{step} Visual</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">{title}</h3>
              <p className="text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

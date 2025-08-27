import react from '../../assets/react.svg'
import typescript from '../../assets/typescript.svg'
import tailwind from '../../assets/tailwind.svg'
import codemirror from '../../assets/codemirror.svg'
import node from '../../assets/node.svg'
import yjs from '../../assets/yjs.svg'
import websockets from '../../assets/websockets.svg'
const stack = [
  { name: "React", desc: "Component-based UI framework",logo : react },
  { name: "TypeScript", desc: "Typed JavaScript for scalable apps",logo : typescript },
  { name: "TailwindCSS", desc: "Utility-first CSS framework",logo : tailwind },
  { name: "CodeMirror", desc: "Advanced code editor component",logo : codemirror },
  { name: "Yjs", desc: "CRDT-based real-time collaboration",logo : yjs },
  { name: "WebSockets", desc: "Live, bidirectional connections",logo : websockets },
  { name: "Node.js", desc: "Backend server & session management",logo : node}
];
export default function TechStackSection() {
  return (
    <section id="techstack" className="py-12 bg-primary-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-yellow-400 mb-12">Tech Stack</h2>
        <div className="flex flex-wrap gap-6">
          {stack.map(t => (
            <div key={t.name} className="px-4 py-6 w-56 rounded bg-primary-950 flex flex-col gap-2 items-center text-center text-gray-100 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 hover:text-yellow-400 transition">
              <img className='w-[40px]' src = {t.logo}/>
              <div className="font-semibold text-lg mb-2">{t.name}</div>
              <div className="text-gray-300 text-sm">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

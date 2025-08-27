import step1Host from '../../assets/step1.mp4'
import step2Host from '../../assets/step2.mp4'
import step1Joinee from '../../assets/step3.mp4'
import step2Joinee from '../../assets/step4.mp4'
const hostSteps = [
  { step: "Step 1", title: "Click Share", desc: "Admin clicks on the Share ID Button",img:step1Host },
  { step: "Step 2", title: "Copy ID", desc: "The Room ID can then be copied to clipboard",img:step2Host }
];
const joineeSteps = [
  { step: "Step 1", title: "Click Join", desc: "On the dashboard, users can click the join room button on the top-right",img:step1Joinee },
  { step: "Step 2", title: "Join Room", desc: "Joinees can paste the shared code and easily start collaborating!",img:step2Joinee }
];
export default function DirectionSection() {
  return (
    <section id="direction" className="py-12 bg-primary-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-100 mb-8">Get Started</h2>
        <div className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-10">On the Host's Editor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
              {hostSteps.map(({ step, title, desc,img }) => (
                <div 
                  key={step} 
                  className=" bg-primary-950 p-4 w-120 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer flex flex-col gap-0 justify-between"
                >
                  <div className="mb-4 rounded flex items-center text-secondary-900">
                    <video src={img}  className='h-fit w-120 m-0 ' autoPlay muted loop/>
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-800 mb-2">{title}</h4>
                  <p className="text-gray-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-yellow-400 mb-4">On the Joinee's Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center">
              {joineeSteps.map(({ step, title, desc,img }) => (
                <div 
                  key={step} 
                  className="bg-primary-950 p-4 w-120 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between"
                >
                  <div className="mb-4 h-fit  rounded flex items-center justify-center text-yellow-400">
                    <video className='w-120 h-fit' src={img} autoPlay muted loop />
                  </div>
                  <h4 className="text-xl font-semibold text-secondary-800 mb-2">{title}</h4>
                  <p className="text-gray-300">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

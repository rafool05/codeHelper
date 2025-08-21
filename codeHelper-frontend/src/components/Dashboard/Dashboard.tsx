import { useState } from 'react';
import RoomsSection from './RoomsSection.tsx';   
import CreateRoomModal from './CreateRoomModal.tsx';
import JoinRoomModal from './JoinRoomModal.tsx';

export default function DashboardPage() {
  const [section, setSection] = useState<'my' | 'joined'>('my');
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  return (
    <>
    <CreateRoomModal isOpen = {createOpen} setOpen = {setCreateOpen}/> 
    <JoinRoomModal isOpen = {joinOpen} setOpen = {setJoinOpen}/> 
    <div className="bg-primary-900 min-h-screen px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-yellow-400">Welcome back!</h1>
        <div className="flex gap-4 mt-6 md:mt-0">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold py-2 px-6 rounded transition flex gap-2 items-center" onClick={()=>{setCreateOpen(true)}}>
            Create Room
          </button>
          <button className="bg-primary-700 hover:bg-primary-800 text-yellow-400 font-semibold py-2 px-6 rounded transition flex gap-2 items-center" onClick={()=>{setJoinOpen(true)}}>
            Join Room
          </button>
        </div>
      </div>
      {/* Tabs/Toggle */}
      <div className="flex gap-6 mb-6">
        <button
          className={`px-6 py-2 rounded-t ${section === 'my' ? 'bg-primary-800 text-yellow-400' : 'bg-primary-700 text-gray-200'} font-semibold transition`}
          onClick={() => setSection('my')}
        >
          My Rooms
        </button>
        <button
          className={`px-6 py-2 rounded-t ${section === 'joined' ? 'bg-primary-800 text-yellow-400' : 'bg-primary-700 text-gray-200'} font-semibold transition`}
          onClick={() => setSection('joined')}
        >
          Joined Rooms
        </button>
      </div>
      <RoomsSection section={section} />
    </div>
    </>
  );
}

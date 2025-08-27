import { backend_url } from '../../utils/getBackendUrl';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomsSection from './RoomsSection.tsx';   
import CreateRoomModal from './CreateRoomModal.tsx';
import JoinRoomModal from './JoinRoomModal.tsx';
import { getUserInfo } from '../../utils/getUserInfo.ts';
import { LogoutModal } from './LogoutModal.tsx';
import { Button } from '../../ui/Button';

export default function DashboardPage() {
  const [section, setSection] = useState<'my' | 'joined'>('my');
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userInfo,setUserInfo] = useState<string | null>(null)
  const navigate = useNavigate();
  function handleLogout() {
  fetch(`${backend_url}/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => {
      navigate('/signin');
    });
  }
  useEffect(()=>{
    getUserInfo().then(response=>{
      document.title = response.username+"'s Dashboard"
      setUserInfo(response.username)
    })
  })
  return (
    <>
    <CreateRoomModal isOpen = {createOpen} setOpen = {setCreateOpen}/> 
    <JoinRoomModal isOpen = {joinOpen} setOpen = {setJoinOpen}/> 
    <LogoutModal isOpen={showLogoutModal} onClose={()=>{setShowLogoutModal(false)}} onAction={()=>{handleLogout()}}/>
    <div className="bg-primary-900 min-h-screen px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-secondary-900">Welcome back!, {userInfo}</h1>
        <div className="flex gap-4 mt-6 md:mt-0">
          <Button
            onClick={()=>{setCreateOpen(true)}}
            variant="pos-cta"
            size="md"
            className='w-40'
          >
            Create Room
          </Button>
          <Button
            onClick={()=>{setJoinOpen(true)}}
            variant="primary"
            size="md"
            className='w-40'
            >
            Join Room
          </Button>
          <Button
            onClick={()=>setShowLogoutModal(true)}
            variant="neg-cta"
            size="md"
            className='w-40'
          >
            Logout
          </Button>
        </div>
      </div>
      {/* Tabs/Toggle */}
      <div className="flex gap-6 mb-6">
        <button
          className={`px-6 py-2 rounded-t ${section === 'my' ? 'bg-primary-800 text-secondary-900' : 'bg-primary-900 text-primary-600'} font-semibold transition`}
          onClick={() => setSection('my')}
        >
          My Rooms
        </button>
        <button
          className={`px-6 py-2 rounded-t ${section === 'joined' ? 'bg-primary-800 text-secondary-900' : 'bg-primary-900 text-primary-600'} font-semibold transition`}
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

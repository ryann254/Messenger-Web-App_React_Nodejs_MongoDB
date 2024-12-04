// import ChannelInfo from '@components/ChannelInfo';
import MainSection from '@components/main-section/MainSection';
// import Sidebar from '@components/Sidebar';

import Navbar from '@components/main-section/Navbar';
import TextInput from '@components/main-section/TextInput';
import { SocketContext } from '@context/socket.ctx';
import { useContext, useEffect } from 'react';

const Home = () => {
  const { selectedConversation, isConversationMember } =
    useContext(SocketContext);
  const userId = '6673f5d4a1e52f2a15f10bc1';
  const fetchUser = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${userId}`
    );
    const user = await result.json();

    if (result.ok) localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='overflow-hidden relative'>
      {/* <Navbar/> and <Sidebar /> components*/}
      <Navbar />
      <div className='h-[85vh] px-6 overflow-x-hidden overflow-y-scroll min-h-full'>
        <MainSection />
      </div>
      {selectedConversation && isConversationMember ? <TextInput /> : <></>}
    </div>
  );
};

export default Home;

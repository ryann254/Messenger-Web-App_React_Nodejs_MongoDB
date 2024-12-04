import ChannelInfo from '@components/channel-info/ChannelInfo';
import Sidebar from '@components/sidebar/Sidebar';
import { SocketContext } from '@context/socket.ctx';
import { useContext } from 'react';

const Navbar = () => {
  const { selectedConversation, selectedHomeOption } =
    useContext(SocketContext);
  return (
    <div className='navbar bg-white border-b-2 border-black[/.2]'>
      <div className='flex-none'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <a className='text-lg font-bold'>
          {selectedConversation
            ? selectedConversation.name
            : selectedHomeOption}
        </a>
      </div>
      <div className='flex-none'>
        {selectedConversation ? (
          <ChannelInfo />
        ) : (
          <i className='fa-solid text-lg p-3 cursor-pointer fa-magnifying-glass tex'></i>
        )}
      </div>
    </div>
  );
};

export default Navbar;

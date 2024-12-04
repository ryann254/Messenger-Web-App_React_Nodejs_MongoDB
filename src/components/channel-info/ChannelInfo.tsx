import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '@context/socket.ctx';
import { IUser } from '@interfaces/user';

export const Member = ({
  title,
  members,
}: {
  title: string;
  members: IUser[];
}) => {
  const randomColors: string[] = [
    '#D97DE9',
    '#DF6F0B',
    '#0E77D9',
    '#5FB918',
    '#0B5FAE',
    '#C91616',
    '#16C9C9',
    '#1616C9',
    '#C9C916',
    '#C916C9',
    '#16C916',
    '#C9C9C9',
    '#161616',
  ];

  const randomColorsGenerator = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };

  return (
    <div className='mt-6'>
      <h4 className='text-[#7D7A89] font-semibold'>{title}</h4>
      {members.map((member, index) => (
        <div key={index + member.username} className='flex items-center my-3'>
          {member.imageUrl ? (
            <div className='relative w-10 h-10 rounded-full mr-5'>
              <img
                src={member.imageUrl}
                alt='avatar'
                className='w-full h-full rounded-full'
              />
              <span className='absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#1AC391]'></span>
            </div>
          ) : (
            <div
              className='h-10 w-10 cursor-pointer rounded-full flex justify-center items-center text-white font-bold text-xl mr-3'
              style={{
                backgroundColor: randomColorsGenerator(),
              }}
            >
              {member.username[0]}
            </div>
          )}
          <h4 className='font-semibold text-black'>{member.username}</h4>
        </div>
      ))}
    </div>
  );
};

const ChannelInfo = () => {
  const [onlineMembers, setOnlineMembers] = useState<IUser[] | undefined>();
  const [offlineMembers, setOfflineMembers] = useState<IUser[] | undefined>();
  const { selectedConversation } = useContext(SocketContext);

  useEffect(() => {
    const onlineMembers = selectedConversation?.members.filter(
      (member) => member.online === true
    );
    const offlineMembers = selectedConversation?.members.filter(
      (member) => member.online === false
    );
    setOnlineMembers(onlineMembers);
    setOfflineMembers(offlineMembers);
  }, [selectedConversation]);
  return (
    <div className='drawer drawer-end z-10'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          htmlFor='my-drawer-4'
          className='btn btn-square btn-ghost drawer-button'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='inline-block w-5 h-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z'
            ></path>
          </svg>
        </label>
      </div>
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='menu w-[86%] min-h-full bg-white'>
          {/* Channel Info content here */}
          <div className='flex py-5 px-3.5 border-b border-black/[.1] justify-between items-center'>
            <span className='text-xl font-semibold'>Channel Info</span>
            <label
              htmlFor='my-drawer-4'
              aria-label='close sidebar'
              className='pt-1.5'
            >
              <i className='fa-solid fa-xmark text-black/[.5] text-xl cursor-pointer'></i>
            </label>
          </div>
          {/* Channel Info Body */}
          <div className='overflow-y-scroll overflow-x-hidden px-3.5 py-4'>
            {/* About */}
            <div className=' border-b border-black/[.1] pb-6'>
              <h3 className='font-semibold text-lg pb-3'>About</h3>
              <div className='rounded-lg bg-[#F3F7FA] w-full p-3'>
                <h4 className='text-[#7D7A89] font-semibold pb-2.5'>Topic</h4>
                <span>{selectedConversation?.name}</span>
                <h4 className='text-[#7D7A89] font-semibold py-2.5'>
                  Description
                </h4>
                <span>{selectedConversation?.description}</span>
              </div>
            </div>
            {/* Members */}
            <div className='pt-5'>
              <div className='flex justify-between items-center'>
                <div className='flex'>
                  <h3 className='text-lg font-semibold mr-4'>Members</h3>
                  <div className='bg-[#F18524] text-white px-1.5 py-0.5 text-sm rounded-lg font-semibold'>
                    {selectedConversation?.members.length}
                  </div>
                </div>
                <i className='fa-solid fa-user-plus cursor-pointer text-lg text-black/[.5]'></i>
              </div>
              {/* Admin */}
              <Member
                members={[selectedConversation?.members[0]]}
                title={`Admin - 1`}
              />

              {/* Online Members */}
              {onlineMembers && (
                <Member
                  members={onlineMembers}
                  title={`Online - ${onlineMembers?.length}`}
                />
              )}

              {/* Offline Members */}
              {offlineMembers && (
                <Member
                  members={offlineMembers}
                  title={`Offline - ${offlineMembers?.length}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInfo;

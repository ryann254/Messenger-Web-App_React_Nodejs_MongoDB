import Zoro from '@assets/zoro.jpg';
import Sanji from '@assets/sanji.jpg';
import Luffy from '@assets/luffy.jpg';
import Brook from '@assets/brook.jpg';
import Franky from '@assets/franky.jpg';
import { useContext } from 'react';
import { SocketContext } from '@context/socket.ctx';

const JoinConversation = () => {
  const {
    selectedConversation,
    setIsConversationMember,
    onConversationUpdated,
  } = useContext(SocketContext);

  const members: string[] = [Sanji, Luffy, Brook, Franky];
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

  const hanldeJoinConversation = async () => {
    try {
      const newMembers: string[] = [];
      selectedConversation?.members.forEach((member) => {
        newMembers.push(member._id);
      });
      const user = JSON.parse(localStorage.getItem('user') || '');
      newMembers.push(user._id);

      const data = {
        user: {
          ...user,
          conversation: [...user.conversation, selectedConversation?._id],
        },
        conversation: {
          name: selectedConversation?.name,
          members: newMembers,
        },
      };

      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/conversation/${
          selectedConversation?._id
        }`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const updatedConversation = await result.json();

      if (result.ok) {
        onConversationUpdated(updatedConversation);
        setIsConversationMember(true);
        // @ts-expect-error showModal is a function that comes with daisyui.
        document.getElementById('my_modal_4')?.showModal();
      }
    } catch (error) {
      console.error('Error creating conversation', error);
    }
  };

  return (
    <div className='flex flex-col justify-center h-full'>
      <div className='flex flex-col items-center py-5'>
        <span className='font-bold'>You are about to join</span>
        <div
          className='h-16 w-16 my-5 cursor-pointer rounded-full flex justify-center items-center text-white font-bold text-2xl'
          style={{
            backgroundColor: randomColorsGenerator(),
          }}
        >
          {selectedConversation?.name[0]}
        </div>
        <h3 className='font-bold text-2xl mb-5'>
          {selectedConversation?.name} Community
        </h3>
        <span className='text-black/[0.5] text-center'>
          This is a community to share knowledge and fun facts about{' '}
          {selectedConversation?.name}. Be kind to all members and they'll be
          kind to you.
        </span>
      </div>
      <div className='flex flex-col my-5'>
        <span className='font-bold text-sm text-black/[.5]'>Admin</span>
        <div className='flex items-center my-3'>
          <div className='relative w-10 h-10 rounded-full mr-5'>
            <img
              src={Zoro}
              alt='avatar'
              className='w-full h-full rounded-full'
            />
            <span className='absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white bg-[#1AC391]'></span>
          </div>
          <h4 className='font-semibold text-black'>Roronoa Zoro</h4>
        </div>
      </div>
      <div className='flex flex-col my-5'>
        <span className='font-bold text-sm text-black/[.5]'>Members</span>
        <div className='flex justify-start items-center my-3'>
          <div className='relative w-full rounded-full mr-5'>
            {members.map((member, index) => (
              <img
                key={index}
                src={member}
                alt='avatar'
                className={`absolute top-0 w-9 h-9 border-2 border-white rounded-full`}
                style={{
                  left: `${index * 0.7}rem`,
                  zIndex: members.length - index,
                }}
              />
            ))}
            <span className='absolute top-2 left-20 font-semibold text-black/[0.6] text-sm'>
              +50
            </span>
          </div>
        </div>
        <label htmlFor='my-drawer' aria-label='close sidebar' className='mt-9'>
          <button
            className='mt-24 tex-center py-3 bg-[#0B5FAE] text-white rounded-lg w-full font-semibold'
            onClick={hanldeJoinConversation}
          >
            Join Conversation
          </button>
        </label>
      </div>
    </div>
  );
};

export default JoinConversation;

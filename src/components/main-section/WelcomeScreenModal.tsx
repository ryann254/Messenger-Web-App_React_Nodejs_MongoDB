import { SocketContext } from '@context/socket.ctx';
import { useContext } from 'react';

const WelcomeScreenModal = () => {
  const { selectedConversation } = useContext(SocketContext);

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
    <dialog id='my_modal_4' className='modal'>
      <div className='modal-box w-full h-[63%] max-h-full absolute bottom-0 rounded-b-none p-0'>
        <div className='flex flex-col items-center py-5 px-4'>
          <span className='font-bold'>Welcome to</span>
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
            {selectedConversation?.name}. Here are your next steps:
          </span>
        </div>
        <div className='flex flex-col justify-center text-sm bg-[#0B5FAE]/[.1] py-4 mx-4 rounded-lg p-4'>
          <span className='font-semibold'>Let's say hello to the members!</span>
          <span className='pt-2.5 text-black/[.3]'>#say-hello</span>
        </div>
        <div className='flex flex-col justify-center text-sm bg-[#0B5FAE]/[.1] py-4 mx-4 rounded-lg mt-3 p-4'>
          <span className='font-semibold'>
            Check out the Conversation guidelines and rules.
          </span>
          <span className='pt-2.5 text-black/[.3]'>#guidelines</span>
        </div>

        <form method='dialog' className='flex justify-center mt-6 w-full'>
          {/* if there is a button in form, it will close the modal */}
          <button className='bg-[#0B5FAE] rounded-lg text-white py-2.5 px-10 font-bold'>
            Let's Go!
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default WelcomeScreenModal;

import { useContext } from 'react';
import { SocketContext } from '@context/socket.ctx';
import { IConversation } from '@interfaces/convesation';

export const Conversation = ({
  conversation,
  randomColorsGenerator,
}: {
  conversation: IConversation;
  randomColorsGenerator: () => string;
}) => {
  const { setSidebarSelection, onConversationMemberCheck } =
    useContext(SocketContext);

  const handleConversation = (conversation: IConversation) => {
    setSidebarSelection(conversation.name);
    onConversationMemberCheck(conversation);
  };
  return (
    <div
      className='flex flex-col rounded-xl border border-black/[0.2] mb-3 cursor-pointer'
      onClick={() => handleConversation(conversation)}
    >
      <div className='relative w-full h-24'>
        <div
          className='w-full h-24 rounded-t-xl absolute top-0 left-0'
          style={{
            backgroundColor: randomColorsGenerator(),
          }}
        />
        <div
          className='h-12 w-12 cursor-pointer rounded-xl border-2 border-white flex justify-center items-center text-white font-bold text-xl mr-3 absolute top-4 left-4'
          style={{
            backgroundColor: randomColorsGenerator(),
          }}
        >
          {'G'}
        </div>
      </div>
      <div className='flex flex-col my-5 px-4'>
        <h3 className='text-lg font-semibold'>{conversation.name}</h3>
        <span className='text-black/[.5] my-2'>{conversation.description}</span>
        <span className='font-semibold'>
          {conversation.members.length} members
        </span>
      </div>
    </div>
  );
};

const ExplorePage = () => {
  const { conversations } = useContext(SocketContext);
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
    <>
      <h3 className='my-5 text-xl font-semibold'>Featured Conversations</h3>
      {conversations.length ? (
        conversations.map((conversation, index) => (
          <Conversation
            key={index + conversation.name}
            conversation={conversation}
            randomColorsGenerator={randomColorsGenerator}
          />
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default ExplorePage;

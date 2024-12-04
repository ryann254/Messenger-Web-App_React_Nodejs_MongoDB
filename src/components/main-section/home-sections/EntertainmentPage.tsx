import { SocketContext } from '@context/socket.ctx';
import { useContext, useEffect, useState } from 'react';
import { Conversation } from './ExplorePage';
import { IConversation } from '@interfaces/convesation';

const EntertainmentPage = () => {
  const { conversations } = useContext(SocketContext);
  const [entertainmentConversations, setEntertainmentConversations] = useState<
    IConversation[]
  >([]);
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

  useEffect(() => {
    if (conversations) {
      const entertainmentConversations = conversations.filter(
        (conversation) => conversation.tag === 'entertainment'
      );
      setEntertainmentConversations(entertainmentConversations);
    }
  }, [conversations]);

  const randomColorsGenerator = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };
  return (
    <>
      {entertainmentConversations.length ? (
        <>
          <h3 className='my-5 text-xl font-semibold'>Featured Conversations</h3>
          {entertainmentConversations.map((conversation, index) => (
            <Conversation
              key={index + conversation.name}
              conversation={conversation}
              randomColorsGenerator={randomColorsGenerator}
            />
          ))}
        </>
      ) : (
        <div className='mt-5 font-bold text-lg'>No Conversations Yet!</div>
      )}
    </>
  );
};

export default EntertainmentPage;

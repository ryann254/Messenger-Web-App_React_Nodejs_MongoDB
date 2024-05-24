import { IConversation } from '@interfaces/convesation';
import { IMessage } from '@interfaces/message';
import { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type Props = {
  children: React.ReactNode;
};

interface ISocketContext {
  isConnected: boolean;
  conversations: IConversation[];
  selectedConversation: IConversation | undefined;
  setSelectedConversation: React.Dispatch<
    React.SetStateAction<IConversation | undefined>
  >;
  selectedHomeOption: string;
  setSelectedHomeOption: React.Dispatch<React.SetStateAction<string>>;
}

export const SocketContext = createContext<ISocketContext>({
  isConnected: false,
  conversations: [],
  selectedConversation: undefined,
  setSelectedConversation: () => {},
  selectedHomeOption: '',
  setSelectedHomeOption: () => {},
});

export const SocketContextProvider = ({ children }: Props) => {
  // Connect to the io Server.
  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      userId: '6635e291cdd94f2d13ca1687',
    },
    transports: ['websocket', 'polling'],
    withCredentials: true,
  });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation>();
  const [selectedHomeOption, setSelectedHomeOption] = useState('Explore');

  const onConnect = () => {
    setIsConnected(true);

    // Check the transport protocol that is being used.
    const transport = socket.io.engine.transport.name; // in most cases, "polling"
    console.log('main transport', transport);

    socket.io.engine.on('upgrade', () => {
      const upgradedTransport = socket.io.engine.transport.name; // in most cases, "websocket"
      console.log('upgraded transport', upgradedTransport);
    });
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onConversations = (conversations: IConversation[]) => {
    setConversations(conversations);
  };

  useEffect(() => {
    const onMessageSent = (fullDocument: IMessage) => {
      // Find the conversation that matches the provided ID
      setSelectedConversation((currentConversation) => {
        if (currentConversation?._id === fullDocument.conversation) {
          return {
            ...currentConversation,
            messages: [...currentConversation.messages, fullDocument],
          };
        }
        return currentConversation;
      });
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('conversations', onConversations);
    socket.on('messageToRoom', onMessageSent);
    socket.on('connect_error', (err: Error) => {
      // the reason of the error, for example "xhr poll error"
      console.error('Error', err.message);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('conversations', onConversations);
      socket.off('messageToRoom', onMessageSent);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        conversations,
        selectedConversation,
        setSelectedConversation,
        selectedHomeOption,
        setSelectedHomeOption,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
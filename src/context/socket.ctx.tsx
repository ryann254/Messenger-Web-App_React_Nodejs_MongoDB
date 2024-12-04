/* eslint-disable @typescript-eslint/no-explicit-any */
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
  selectedHomeOption: string;
  setSelectedHomeOption: React.Dispatch<React.SetStateAction<string>>;
  isConversationMember: boolean;
  setIsConversationMember: React.Dispatch<React.SetStateAction<boolean>>;
  onConversationMemberCheck: (conversation: IConversation | undefined) => void;
  onConversationUpdated: (conversation: IConversation | undefined) => void;
  sidebarSelection: string;
  setSidebarSelection: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isUpdating: { value: boolean; messageId: string };
  setIsUpdating: React.Dispatch<
    React.SetStateAction<{ value: boolean; messageId: string }>
  >;
}

export const SocketContext = createContext<ISocketContext>({
  isConnected: false,
  conversations: [],
  selectedConversation: undefined,
  selectedHomeOption: '',
  setSelectedHomeOption: () => {},
  isConversationMember: false,
  setIsConversationMember: () => {},
  onConversationMemberCheck: () => {},
  onConversationUpdated: () => {},
  sidebarSelection: 'Home',
  setSidebarSelection: () => {},
  message: '',
  setMessage: () => {},
  isUpdating: { value: false, messageId: '' },
  setIsUpdating: () => {},
});

export const SocketContextProvider = ({ children }: Props) => {
  // Connect to the io Server.
  const loggedInUser = JSON.parse(localStorage.getItem('user') || '');

  const socket = io(import.meta.env.VITE_BACKEND_URL, {
    auth: {
      userId: loggedInUser._id,
    },
    transports: ['websocket', 'polling'],
    withCredentials: true,
  });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<IConversation>();
  const [selectedHomeOption, setSelectedHomeOption] = useState('Explore');
  const [isConversationMember, setIsConversationMember] = useState(false);
  const [sidebarSelection, setSidebarSelection] = useState('Home');
  const [message, setMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState({ value: false, messageId: '' });

  // Checks if a user is a member of a conversation before joining.
  const onConversationMemberCheck = (
    conversation: IConversation | undefined
  ) => {
    if (conversation) {
      const isMember = conversation.members.find(
        (member) => member._id === loggedInUser._id
      );
      setIsConversationMember(isMember ? true : false);
      setSelectedConversation(conversation);
    } else {
      setSelectedConversation(undefined);
      setIsConversationMember(false);
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
  };

  const onConversations = (conversations: IConversation[]) => {
    setConversations(conversations);
  };

  const onConversationCreated = async (conversation: IConversation) => {
    if (conversation) {
      // When a Conversation is created, Socket IO's mongodb adapter give us the Conversation document where members are not populated.
      // Hence we have to refetch the conversation with populated members.
      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/conversation/${
          conversation._id
        }`
      );
      const populatedConversation = await result.json();

      if (result.ok) {
        setConversations((currentConversations) => [
          ...currentConversations,
          populatedConversation,
        ]);
      }
    }
  };

  // Memoize the index that matches the updatedMessage Id to avoid expensive calculations on every render.
  const conversationIndexCache: Record<string, number> = {};

  const getConversationIndex = (
    conversations: IConversation[],
    updatedConversationId: string
  ) => {
    // Check if the result is already cached
    if (conversationIndexCache[`${updatedConversationId}`]) {
      return conversationIndexCache[`${updatedConversationId}`];
    }

    // Compute the index if not cached
    const index = conversations.findIndex(
      (conversation) => conversation._id === updatedConversationId
    );

    // Cache the result
    conversationIndexCache[`${updatedConversationId}`] = index;

    return index;
  };

  const onConversationUpdated = (
    updatedConversation: IConversation | undefined
  ) => {
    if (updatedConversation) {
      // Update all the conversations
      setConversations((currentConversations) => {
        const index = getConversationIndex(
          currentConversations,
          updatedConversation._id
        );
        if (index !== -1) {
          currentConversations[index] = updatedConversation;
        }
        return currentConversations;
      });
      // Update the members in a current conversation after a user has joined the conversation.
      setSelectedConversation(updatedConversation);
    }
  };

  // Memoize the index that matches the updatedMessage Id to avoid expensive calculations on every render.
  const messageIndexCache: Record<string, number> = {};

  const getMessageIndex = (conversation: IConversation, messageId: string) => {
    // Check if the result is already cached
    if (messageIndexCache[`${conversation._id}-${messageId}`]) {
      return messageIndexCache[`${conversation._id}-${messageId}`];
    }

    // Compute the index if not cached
    const index = conversation.messages.findIndex(
      (message) => message._id === messageId
    );

    // Cache the result
    messageIndexCache[`${conversation._id}-${messageId}`] = index;

    return index;
  };

  const onMessageUpdated = (updatedMessage: IMessage | undefined) => {
    console.log(updatedMessage, 'updated message');
    if (updatedMessage) {
      setSelectedConversation((currentConversation) => {
        if (currentConversation) {
          const updatedMessages = [...currentConversation.messages];

          const index = getMessageIndex(
            currentConversation,
            updatedMessage._id
          );

          if (index !== -1) {
            updatedMessages[index] = updatedMessage;
          }
          return { ...currentConversation, messages: updatedMessages };
        }
      });
    }
  };

  useEffect(() => {
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

    const onMessageSent = (messageDocument: IMessage) => {
      if (messageDocument) {
        // Find the conversation that matches the provided ID
        setSelectedConversation((currentConversation) => {
          if (currentConversation?._id === messageDocument.conversation) {
            return {
              ...currentConversation,
              messages: [...currentConversation.messages, messageDocument],
            };
          }
          return currentConversation;
        });
      }
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('conversations', onConversations);
    socket.on('messageCreated', onMessageSent);
    socket.on('conversationCreated', onConversationCreated);
    socket.on('messageUpdated', onMessageUpdated);
    socket.on('connect_error', (err: Error) => {
      // the reason of the error, for example "xhr poll error"
      console.error('Error', err.message);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('conversations', onConversations);
      socket.off('messageCreated', onMessageSent);
      socket.off('conversationCreated', onConversationCreated);
      socket.off('messageUpdated', onMessageUpdated);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        conversations,
        selectedConversation,
        selectedHomeOption,
        setSelectedHomeOption,
        isConversationMember,
        setIsConversationMember,
        onConversationMemberCheck,
        onConversationUpdated,
        sidebarSelection,
        setSidebarSelection,
        message,
        setMessage,
        isUpdating,
        setIsUpdating,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

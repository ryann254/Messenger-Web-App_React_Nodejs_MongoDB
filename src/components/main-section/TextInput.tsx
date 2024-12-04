import { SocketContext } from '@context/socket.ctx';
import { useContext, useEffect } from 'react';

const TextInput = () => {
  const {
    selectedConversation,
    message,
    setMessage,
    isUpdating,
    setIsUpdating,
  } = useContext(SocketContext);

  useEffect(() => {
    const textInput = document.getElementById('textInput');
    textInput?.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    return () => {
      textInput?.removeEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    };
  }, []);

  const sendMessage = async () => {
    if (message === '') {
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '');
      const data = {
        user,
        message: {
          sender: user._id,
          recipientId: selectedConversation?.members[0]._id,
          recepientName: selectedConversation?.name,
          conversationId: selectedConversation?._id,
          sent: false,
          text: message,
        },
      };

      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  // Trigger the message update from the frontend.
  const handleMessageUpdate = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '');
      const data = {
        user: user,
        message: {
          sender: user._id,
          recipientId: selectedConversation?.members[0]._id,
          recipientName: selectedConversation?.name,
          text: message,
          sent: true,
        },
      };

      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/message/${
          isUpdating.messageId
        }`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (result.ok) {
        setMessage('');
        setIsUpdating({ value: false, messageId: '' });
      }
    } catch (error) {
      console.error('Error updating message', error);
    }
  };
  return (
    <div className='flex px-6 py-4 relative'>
      <div className='h-14 w-14 mr-4 rounded-full border border-black/[.2] flex justify-center items-center cursor-pointer'>
        <i className='fa-solid fa-plus text-black/[.4] !font-normal text-3xl'></i>
      </div>
      <input
        type='text'
        id='textInput'
        className='w-[85%] px-4 py-2 border border-black/[.1] rounded-md focus:outline-none'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='Message...'
      />
      <i
        className='fa-solid fa-paper-plane text-lg absolute bottom-[40%] right-[9%] cursor-pointer text-sky-600'
        onClick={() =>
          isUpdating.value ? handleMessageUpdate() : sendMessage()
        }
      ></i>
    </div>
  );
};

export default TextInput;

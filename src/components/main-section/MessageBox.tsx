import { SocketContext } from '@context/socket.ctx';
import { IMessage } from '@interfaces/message';
import useFormattedTime from '@utils/useFormattedTime';
import { useContext } from 'react';

const MessageBox = ({
  username,
  message,
}: {
  username: string;
  message: IMessage;
}) => {
  const { media_url, updatedAt, text } = message;
  const formattedTime = useFormattedTime(new Date(updatedAt));
  const { setIsUpdating, setMessage } = useContext(SocketContext);

  const handleMessageUpdate = () => {
    setIsUpdating({ value: true, messageId: message._id });
    setMessage(message.text);
  };
  return (
    <div className='pt-5 flex items-start'>
      {media_url !== '' && media_url !== undefined ? (
        <img
          src={media_url}
          alt='profile pic'
          className='h-11 w-11 rounded-full mr-4'
        />
      ) : (
        <div className='h-11 w-11 rounded-full bg-red-300 flex justify-center items-center text-white font-semibold text-xl mr-4'>
          {username[0]}
        </div>
      )}
      <div className='flex flex-col justify-start w-[85%]'>
        <div className='flex items-center'>
          <div className='mr-5 font-semibold text-black text-lg tracking-wider'>
            {username}
          </div>
          <div className='text-sm text-black/[.4]'>{formattedTime}</div>
          <div className='ml-auto cursor-pointer dropdown dropdown-hover dropdown-left'>
            <i
              tabIndex={0}
              role='button'
              className='fa-solid fa-ellipsis text-black/[.5]'
            ></i>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow'
            >
              <li
                className='p-2 text-[#0B5FAE] rounded-lg hover:bg-[#A3D1FC]'
                onClick={handleMessageUpdate}
              >
                Update
              </li>
              <li className='p-2 text-[#C91616] rounded-lg hover:bg-[#FBB4B4]'>
                Delete
              </li>
            </ul>
          </div>
        </div>
        <div className='text-black/[.7] tracking-wide'>{text}</div>
      </div>
    </div>
  );
};

export default MessageBox;

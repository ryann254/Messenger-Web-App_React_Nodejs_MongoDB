import UploadImage from '@assets/upload-image.png';
import { useState } from 'react';

const CreateConversationModal = () => {
  const [conversationName, setConversationName] = useState('');
  const [tag, setTag] = useState('gaming');
  const [description, setDescription] = useState('');

  // TODO: Add a popup message to show success or errors
  const handleCreateConversation = async () => {
    if (!conversationName || !description) {
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem('user') || '');
      const data = {
        user,
        conversation: {
          name: conversationName,
          tag,
          description,
          members: [user._id],
        },
      };

      const result = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/conversation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (result.ok) setConversationName('');
    } catch (error) {
      console.error('Error creating conversation', error);
    }
  };

  return (
    <dialog id='my_modal_3' className='modal'>
      <div className='modal-box w-full h-[78%] max-h-full absolute bottom-0 rounded-b-none p-0'>
        <div className='p-6'>
          <h3 className='text-lg text-center tracking-wide font-bold'>
            Create a Conversation
          </h3>
          <p className='py-3 text-center text-black/[.5] text-sm'>
            Your conversation is where you and your team hang out. Make yours
            and start talking
          </p>
          <div className='flex flex-col items-center justify-center mt-6 mb-4 cursor-pointer'>
            <img src={UploadImage} alt='Upload' />
            <span className='text-sm font-bold text-[#0B5FAE] mt-3'>
              Upload image
            </span>
          </div>
          <div className='flex flex-col mb-2'>
            <label
              htmlFor='conversationName'
              className='text-sm text-black/[.5] font-bold my-2'
            >
              Conversation Name
            </label>
            <input
              type='text'
              className='input focus:border-none focus:outline-none text-sm input-bordered border-[#D8E0E8] w-full bg-[#F1F5F9]'
              id='serverName'
              value={conversationName}
              onChange={(e) => setConversationName(e.target.value)}
              placeholder='Eg. Zoro fan club'
            />
            <label
              htmlFor='tag'
              className='text-sm text-black/[.5] font-bold mt-4 mb-2'
            >
              Kindly choose a tag
            </label>
            <select
              className='select focus:border-none focus:outline-none select-bordered border-[#D8E0E8] w-full bg-[#F1F5F9]'
              defaultValue='gaming'
              onChange={(e) => setTag(e.target.value)}
            >
              <option value='gaming'>Gaming</option>
              <option value='entertainment'>Entertainment</option>
              <option value='working'>Working</option>
              <option value='hobby'>Hobby</option>
            </select>
            <label
              htmlFor='tag'
              className='text-sm text-black/[.5] font-bold mt-4 mb-2'
            >
              Description
            </label>
            <textarea
              value={description}
              className='textarea textarea-bordered focus:border-none focus:outline-none border-[#D8E0E8] bg-[#F1F5F9] w-full'
              placeholder='This conversation is about...'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <span className='text-[13px] text-black/[.5]'>
            By creating a conversation, you agree to the{' '}
            <span className='text-[#0B5FAE] font-bold'>
              Community Guildelines
            </span>
          </span>
        </div>
        <div className='flex justify-between items-center text-sm bg-[#0B5FAE]/[.1] py-4 px-6'>
          <form method='dialog' className='flex justify-between w-full'>
            {/* if there is a button in form, it will close the modal */}
            <button className='bg-transparent font-bold'>Close</button>
            <button
              className='bg-[#0B5FAE] rounded-lg text-white p-2.5'
              onClick={handleCreateConversation}
            >
              Create Conversation
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateConversationModal;

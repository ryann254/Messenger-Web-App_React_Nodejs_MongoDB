import { useContext } from 'react';
import Avatar from '@assets/Avatar-2.png';
import { SocketContext } from '@context/socket.ctx';
import { IConversation } from '@interfaces/convesation';
import ConversationCircle from './ConversationCircle';

const DiscoverSection = ({ homeOptions }: { homeOptions: IHomeOptions[] }) => {
  const { selectedHomeOption, setSelectedHomeOption } =
    useContext(SocketContext);
  return (
    <>
      <div className='flex justify-between items-center py-8 pb-5'>
        <div className='text-[26px] text-white font-semibold tracking-wide border-b border-white/[.3]'>
          Discover
        </div>
        <label htmlFor='my-drawer' aria-label='close sidebar'>
          <i className='fa-solid fa-xmark text-white/[.5] text-xl cursor-pointer'></i>
        </label>
      </div>
      {homeOptions.map((option, index) => (
        <label
          key={index + option.name}
          htmlFor='my-drawer'
          aria-label='close sidebar'
        >
          <div
            className={`text-lg cursor-pointer flex items-center mt-4 ${
              selectedHomeOption === option.name
                ? 'text-[#28246F] bg-white'
                : 'text-white/[.3] bg-transparent'
            } p-3 rounded-lg  font-semibold`}
            onClick={() => setSelectedHomeOption(option.name)}
          >
            <i className={`${option.icon}`}></i>
            <span className='text-sm'>{option.name}</span>
          </div>
        </label>
      ))}
    </>
  );
};

const ConversationSection = ({
  conversation,
  channel,
}: {
  conversation: IConversation | undefined;
  channel: IChannel;
}) => {
  return (
    <>
      <div className='flex items-center border-b border-white/[.3] py-3.5 pb-2.5'>
        <div className='flex flex-col w-[95%]'>
          <div className='text-xl text-white font-semibold tracking-wide text-ellipsis text-nowrap overflow-hidden w-[70%]'>
            {conversation?.name}
          </div>
          <span className='text-sm text-white/[.4]'>14 Members</span>
        </div>
        <label htmlFor='my-drawer' aria-label='close sidebar'>
          <i className='fa-solid fa-xmark text-white/[.5] text-lg  cursor-pointer'></i>
        </label>
      </div>
      {channel.hashTags.map((hashtag, index) => (
        <div
          key={index + hashtag}
          className={`cursor-pointer px-3 py-4 pb-0 text-white/[.5]`}
        >
          {hashtag}
        </div>
      ))}
    </>
  );
};

interface IHomeOptions {
  name: string;
  icon: string;
}

interface IChannel {
  name: string;
  hashTags: string[];
}

const Sidebar = () => {
  const {
    conversations,
    onConversationMemberCheck,
    selectedConversation,
    sidebarSelection,
    setSidebarSelection,
  } = useContext(SocketContext);

  const channelNames: IChannel[] = [
    {
      name: 'One Piece Chat',
      hashTags: ['# Wano Arc', '# Egghead Arc', '# Marineford Arc'],
    },
    {
      name: 'Naruto Universe',
      hashTags: ['# Chunin Exams', '# Akatsuki', '# Five Kage Summit'],
    },
    {
      name: 'Jujutsu Kaisen World',
      hashTags: [
        '# Cursed Techniques',
        '# Tokyo No. 1 Colony',
        '# Gojo Satoru',
      ],
    },
    {
      name: 'Demon Slayer Universe',
      hashTags: [
        '# Demon Slayers',
        '# Mugen Train Arc',
        '# Entertainment District Arc',
      ],
    },
  ];
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

  const homeOptions: IHomeOptions[] = [
    {
      name: 'Explore',
      icon: 'fa-solid fa-compass mr-2',
    },
    {
      name: 'Gaming',
      icon: 'fa-solid fa-gamepad mr-2',
    },
    {
      name: 'Working',
      icon: 'fa-solid fa-briefcase mr-2',
    },
    {
      name: 'Entertainment',
      icon: 'fa-solid fa-camera mr-2',
    },
    {
      name: 'Hobby',
      icon: 'fa-solid fa-bag-shopping mr-2',
    },
  ];

  const handleSidebarSelection = (
    name: string,
    conversation?: IConversation
  ) => {
    if (name === 'Home') {
      setSidebarSelection(name);
      onConversationMemberCheck(undefined);
    } else {
      setSidebarSelection(name);
      onConversationMemberCheck(conversation);
    }
  };

  const randomColorsGenerator = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };

  return (
    <div className='drawer z-10'>
      {/* Sidebar Button */}
      <input id='my-drawer' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content'>
        <label
          htmlFor='my-drawer'
          className='btn btn-square btn-ghost drawer-button'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
            className='inline-block w-5 h-5 stroke-current'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </label>
      </div>
      {/* Sidebar content here */}
      <div className='drawer-side'>
        <label
          htmlFor='my-drawer'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        <div className='menu w-[86%] min-h-full bg-[#28246F] text-base-content flex flex-row'>
          <div className='w-20 flex flex-col justify-start items-center'>
            {/* Home Button */}
            <div
              className={`bg-white h-9 w-9 rounded-xl mt-4 mb-5 flex justify-center items-center ${
                sidebarSelection === 'Home' ? 'opacity-100' : 'opacity-70'
              }`}
              onClick={() => handleSidebarSelection('Home')}
            >
              <i className='fa-solid fa-house'></i>
            </div>
            {/* Conversation Section */}
            <div className='border border-white/[.3] w-[50%] mb-1'></div>
            <div className='max-h-[60%] overflow-y-scroll w-full flex flex-col items-center'>
              {conversations.length ? (
                conversations.map((conversation, index) => (
                  <label
                    key={index + conversation.name}
                    htmlFor='my-drawer'
                    aria-label='close sidebar'
                  >
                    <ConversationCircle
                      sidebarSelection={sidebarSelection}
                      handleSidebarSelection={handleSidebarSelection}
                      index={index}
                      conversation={conversation}
                      randomColorsGenerator={randomColorsGenerator}
                    />
                  </label>
                ))
              ) : (
                <></>
              )}
            </div>
            {/* Create Conversation Section */}
            <label
              htmlFor='my-drawer'
              aria-label='close sidebar'
              className='mt-9'
            >
              <i
                className='fa-solid fa-square-plus text-white cursor-pointer text-3xl rounded-lg'
                onClick={() =>
                  // @ts-expect-error showModal is a function that comes with daisyui.
                  document.getElementById('my_modal_3')?.showModal()
                }
              ></i>
            </label>
            {/* Profile and Settign Section */}
            <img
              src={Avatar}
              alt='avatar'
              className='h-9 w-9 rounded-full mt-auto cursor-pointer'
            />
            <i className='fa-solid fa-gear text-white text-xl my-5 cursor-pointer'></i>
          </div>
          <div className='bg-[#110D59] w-[73%] text-white/[.3] rounded-lg px-3.5'>
            {sidebarSelection === 'Home' ? (
              <DiscoverSection homeOptions={homeOptions} />
            ) : (
              <ConversationSection
                conversation={selectedConversation}
                channel={channelNames[0]}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

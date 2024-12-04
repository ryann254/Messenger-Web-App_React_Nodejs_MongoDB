import { useContext } from 'react';
import { IMessage } from '@interfaces/message';
import MessageBox from './MessageBox';
import { IUser } from '@interfaces/user';
import { SocketContext } from '@context/socket.ctx';
import CreateConversationModal from './CreateConversationModal';
import JoinConversation from './JoinConversation';
import WelcomeScreenModal from './WelcomeScreenModal';
import ExplorePage from './home-sections/ExplorePage';
import GamingPage from './home-sections/GamingPage';
import WorkingPage from './home-sections/WorkingPage';
import EntertainmentPage from './home-sections/EntertainmentPage';
import HobbyPage from './home-sections/HobbyPage';

interface IConversationMember extends IUser {
  username: string;
  email: string;
  online: boolean;
  conversation: string[];
  lastActive: Date;
}

const MainSection = () => {
  const homePageContentMap: Record<string, JSX.Element> = {
    Explore: <ExplorePage />,
    Gaming: <GamingPage />,
    Working: <WorkingPage />,
    Entertainment: <EntertainmentPage />,
    Hobby: <HobbyPage />,
  };

  const { selectedConversation, selectedHomeOption, isConversationMember } =
    useContext(SocketContext);
  // const generatePassword = (length = 8) => {
  //   // Define the character sets
  //   const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  //   const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   const numbers = '0123456789';
  //   const symbols = '!@#$%^&*_';

  //   // Combine all character sets
  //   const allCharacters = lowercase + uppercase + numbers + symbols;

  //   // Ensure the password length is at least 8
  //   if (length < 8) {
  //     length = 8;
  //   }

  //   let password = '';
  //   for (let i = 0; i < length; i++) {
  //     // Generate a random index within the combined character set
  //     const randomIndex = Math.floor(Math.random() * allCharacters.length);
  //     // Append the character at the random index to the password
  //     password += allCharacters[randomIndex];
  //   }

  //   return password;
  // };

  const findUsername = (members: IConversationMember[], sender: string) => {
    const user = members.find((member) => member._id === sender);
    if (user) {
      return user.username;
    }
    return 'Loading...';
  };

  return (
    <>
      <CreateConversationModal />
      <WelcomeScreenModal />
      {!isConversationMember && selectedConversation ? (
        <JoinConversation />
      ) : (
        <></>
      )}
      {selectedConversation &&
      isConversationMember &&
      selectedConversation.messages.length ? (
        selectedConversation.messages.map(
          (message: IMessage, index: number) => (
            <MessageBox
              key={index}
              username={findUsername(
                selectedConversation.members,
                message.sender
              )}
              message={message}
            />
          )
        )
      ) : (
        <></>
      )}
      {!selectedConversation ? homePageContentMap[selectedHomeOption] : <></>}
    </>
  );
};

export default MainSection;

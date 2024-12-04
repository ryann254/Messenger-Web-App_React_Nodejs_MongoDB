import { IConversation } from '@interfaces/convesation';

interface IConversationCircleProps {
  conversation: IConversation;
  index: number;
  randomColorsGenerator: () => string;
  sidebarSelection: string;
  handleSidebarSelection: (name: string, conversation: IConversation) => void;
}

const ConversationCircle = ({
  conversation,
  sidebarSelection,
  randomColorsGenerator,
  handleSidebarSelection,
}: IConversationCircleProps) => {
  return (
    <div
      className={`h-9 w-9 cursor-pointer rounded-full flex justify-center items-center text-white font-semibold text-xl ${
        sidebarSelection === conversation.name
          ? 'scale-125 opacity-100 mt-6'
          : 'opacity-70 mt-5'
      }`}
      style={{
        backgroundColor: randomColorsGenerator(),
      }}
      onClick={() => handleSidebarSelection(conversation.name, conversation)}
    >
      {conversation.name[0]}
    </div>
  );
};

export default ConversationCircle;

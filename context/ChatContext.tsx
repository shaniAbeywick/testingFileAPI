import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';


interface ChatEntry {
  type: 'user' | 'AI';
  message: string;
  english?: string;
}

type OptionKeys = "dirrect_QA" | "h&p";
const options: Record<OptionKeys, string> = {
  "dirrect_QA": "Simple Diagnosis",
  "h&p": "History and Physical Examination"
};

interface ChatContextType {
  chatEntriesGlobal: ChatEntry[];
  addChatEntry: (entry: ChatEntry | ((prevEntries: ChatEntry[]) => ChatEntry[])) => void;
  setChatEntriesGlobal: Dispatch<SetStateAction<ChatEntry[]>>;
  selectedOption: OptionKeys;
  setSelectedOption: Dispatch<SetStateAction<OptionKeys>>;
  hideFirstInterface: boolean;
  setHideFirstInterface: Dispatch<SetStateAction<boolean>>;
  handleHideFirstInterface: () => void;
  id: number; 
  setId: Dispatch<SetStateAction<number>>; 
  chain: string; 
  setChain: Dispatch<SetStateAction<string>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chatEntriesGlobal, setChatEntriesGlobal] = useState<ChatEntry[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionKeys>("dirrect_QA");
  const [hideFirstInterface, setHideFirstInterface] = useState(false);
  const [id, setId] = useState(1); 
  const [chain, setChain] = useState(''); 

  const addChatEntry = (entry: ChatEntry | ((prevEntries: ChatEntry[]) => ChatEntry[])) => {
    if (typeof entry === 'function') {
      setChatEntriesGlobal(prev => entry(prev));
    } else {
      setChatEntriesGlobal(prev => [...prev, entry]);
    }
  };

  const handleHideFirstInterface = () => {
    setHideFirstInterface(true);
  };

  return (
    <ChatContext.Provider value={{
      chatEntriesGlobal, addChatEntry, setChatEntriesGlobal,
      selectedOption, setSelectedOption, hideFirstInterface, 
      setHideFirstInterface, handleHideFirstInterface, id, setId,
      chain, setChain,
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

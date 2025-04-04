
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatWindow } from '@/components/ChatWindow';
import { ChatInput } from '@/components/ChatInput';
import { Message } from '@/components/ChatMessage';
import { useToast } from '@/components/ui/use-toast';

// Initial sample data
const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      content: 'Welcome to the general channel!',
      sender: {
        name: 'System',
        avatar: '/placeholder.svg',
      },
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      content: 'Feel free to ask any questions here.',
      sender: {
        name: 'Admin',
        avatar: '/placeholder.svg',
      },
      timestamp: new Date(Date.now() - 1800000),
    },
  ],
  '2': [
    {
      id: '1',
      content: 'This is the random channel. Share anything interesting!',
      sender: {
        name: 'System',
        avatar: '/placeholder.svg',
      },
      timestamp: new Date(Date.now() - 7200000),
    },
  ],
  '3': [],
};

const channelNames: Record<string, string> = {
  '1': 'general',
  '2': 'random',
  '3': 'help',
};

const Index = () => {
  const [activeChannel, setActiveChannel] = useState('1');
  const [messages, setMessages] = useState<Record<string, Message[]>>(initialMessages);
  const { toast } = useToast();

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      sender: {
        name: 'User',
        avatar: '/placeholder.svg',
      },
      timestamp: new Date(),
    };

    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeChannel]: [...prevMessages[activeChannel], newMessage],
    }));

    // Show a toast for demo purposes
    if (activeChannel === '3') {
      // Simulate a response in the help channel
      setTimeout(() => {
        const botResponse: Message = {
          id: uuidv4(),
          content: "Thanks for your question! Our support team will respond shortly.",
          sender: {
            name: 'HelpBot',
            avatar: '/placeholder.svg',
          },
          timestamp: new Date(),
        };
        
        setMessages((prevMessages) => ({
          ...prevMessages,
          [activeChannel]: [...prevMessages[activeChannel], botResponse],
        }));
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSidebar activeChannel={activeChannel} setActiveChannel={setActiveChannel} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex flex-col flex-1">
          <ChatWindow 
            messages={messages[activeChannel]} 
            channelName={channelNames[activeChannel]} 
          />
          <ChatInput onSendMessage={handleSendMessage} />
        </main>
      </div>
    </div>
  );
};

export default Index;

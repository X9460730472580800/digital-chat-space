
import React from 'react';
import { ChatMessage, Message } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatWindowProps {
  messages: Message[];
  channelName: string;
}

export function ChatWindow({ messages, channelName }: ChatWindowProps) {
  // Reference to the message list container for auto-scrolling
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  // Scroll to bottom whenever messages change
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4 border-b">
        <h2 className="font-semibold text-xl flex items-center">#{channelName}</h2>
      </div>
      
      <ScrollArea className="flex-1 p-0">
        <div className="flex flex-col divide-y">
          {messages.length > 0 ? (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>No messages yet</p>
              <p className="text-sm">Be the first to send a message!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
}

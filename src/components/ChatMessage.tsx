
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

export interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
  };
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.sender.avatar || "/placeholder.svg"} />
        <AvatarFallback>{message.sender.name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <span className="font-medium">{message.sender.name}</span>
          <span className="text-xs text-gray-500">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>
        <p className="text-gray-900 mt-0.5 break-words">{message.content}</p>
      </div>
    </div>
  );
}

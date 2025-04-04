
import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-end gap-2 bg-white rounded-lg border p-2">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-900 rounded-full"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <textarea
          className="flex-1 resize-none outline-none max-h-32 min-h-10"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-900 rounded-full"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button
            size="icon"
            className="rounded-full bg-purple-600 hover:bg-purple-700"
            onClick={handleSendMessage}
            disabled={!message.trim()}
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

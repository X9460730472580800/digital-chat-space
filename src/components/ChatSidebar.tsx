
import React from 'react';
import { Hash, Users, Settings, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Channel {
  id: string;
  name: string;
}

const channels: Channel[] = [
  { id: '1', name: 'general' },
  { id: '2', name: 'random' },
  { id: '3', name: 'help' }
];

interface ChatSidebarProps {
  activeChannel: string;
  setActiveChannel: (id: string) => void;
}

export function ChatSidebar({ activeChannel, setActiveChannel }: ChatSidebarProps) {
  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">ChatSpace</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-4 mb-2">
          <h2 className="text-gray-400 text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2" />
            CHANNELS
          </h2>
        </div>
        <div className="space-y-1 px-2">
          {channels.map(channel => (
            <Button
              key={channel.id}
              variant="ghost"
              className={cn(
                "w-full justify-start pl-8 text-gray-400 hover:text-white hover:bg-gray-800",
                activeChannel === channel.id && "bg-gray-800 text-white"
              )}
              onClick={() => setActiveChannel(channel.id)}
            >
              <Hash className="h-4 w-4 mr-2" />
              {channel.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-800 mt-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="ml-2 text-sm font-medium">User</span>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Settings
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

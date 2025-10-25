'use client';

import { useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import { ChatAvatar } from './chat-avatar';
import { SparkleIcon } from './icons';
import { Skeleton } from './ui/skeleton';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="h-full space-y-6 overflow-y-auto p-4" ref={scrollAreaRef}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(
            'flex items-start gap-4',
            message.role === 'user' && 'flex-row-reverse'
          )}
        >
          <ChatAvatar role={message.role} />
          <div
            className={cn(
              'group relative max-w-[80%] rounded-lg p-3 text-sm shadow-sm',
              message.role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card'
            )}
          >
            {message.role === 'assistant' && (
              <div className="absolute -top-2 -left-2 text-primary">
                 <SparkleIcon className="size-5 text-accent" />
              </div>
            )}
            <p className="whitespace-pre-wrap">{message.content}</p>
            {message.role === 'assistant' && (
              <button
                onClick={() =>
                  isFavorite(message.id)
                    ? removeFavorite(message.id)
                    : addFavorite(message)
                }
                className="absolute -bottom-3 -right-3 hidden rounded-full bg-card p-1.5 text-muted-foreground shadow-md transition-colors hover:text-accent group-hover:block"
                aria-label={isFavorite(message.id) ? 'Unfavorite' : 'Favorite'}
              >
                <Heart
                  className={cn(
                    'size-4',
                    isFavorite(message.id) && 'fill-accent text-accent'
                  )}
                />
              </button>
            )}
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-4">
          <ChatAvatar role="assistant" />
          <div className="max-w-[80%] space-y-2 rounded-lg bg-card p-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      )}
    </div>
  );
}

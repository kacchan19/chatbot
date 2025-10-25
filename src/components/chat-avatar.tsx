import { User, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatAvatarProps {
  role: 'user' | 'assistant';
  className?: string;
}

export function ChatAvatar({ role, className }: ChatAvatarProps) {
  const isUser = role === 'user';
  return (
    <Avatar className={cn('size-8 shadow-sm', className)}>
      <AvatarFallback
        className={cn(
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-accent text-accent-foreground'
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </AvatarFallback>
    </Avatar>
  );
}

'use client';

import { useState, useRef } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSendMessage(content);
    setContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Indonesia..."
        className="w-full resize-none rounded-full border border-border bg-card pr-14 shadow-sm"
        rows={1}
        maxRows={5}
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        disabled={isLoading || !content.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-accent hover:text-accent disabled:opacity-50"
      >
        <Send className="size-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}

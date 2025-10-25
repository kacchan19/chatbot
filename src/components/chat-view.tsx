'use client';

import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useToast } from '@/hooks/use-toast';
import { getAiResponse } from '@/lib/actions';
import type { Message } from '@/lib/types';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';
import { EmptyState } from './empty-state';
import { Bot } from 'lucide-react';

const initialMessages: Message[] = [
  {
    id: nanoid(),
    role: 'assistant',
    content: "Halo! Saya adalah asisten AI Anda. Apa yang bisa saya bantu hari ini?",
    createdAt: new Date(),
  },
];

export function ChatView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiSummary = await getAiResponse(content);
      const aiMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: aiSummary,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: 'Terjadi kesalahan.',
        description: 'Gagal mendapatkan respons dari AI. Silakan coba lagi.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.length > 1 ? (
          <ChatMessages messages={messages} isLoading={isLoading} />
        ) : (
          <EmptyState
            icon={<Bot />}
            title="Selamat Datang di ChatBot"
            description="Mulai percakapan dengan mengetik pertanyaan Anda di bawah."
          />
        )}
      </div>
      <div className="p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

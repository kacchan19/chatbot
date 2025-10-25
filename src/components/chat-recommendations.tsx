'use client';

import { Button } from '@/components/ui/button';
import { Lightbulb } from 'lucide-react';

interface ChatRecommendationsProps {
  onSendMessage: (content: string) => void;
}

const recommendations = [
  'Apa ibu kota Indonesia?',
  'Ceritakan fakta menarik tentang luar angkasa.',
  'Beri aku ide resep untuk makan malam.',
  'Jelaskan apa itu kecerdasan buatan.',
];

export function ChatRecommendations({ onSendMessage }: ChatRecommendationsProps) {
  return (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <Lightbulb className="size-4 text-accent" />
        <h4 className="text-sm font-medium text-muted-foreground">
          Coba tanyakan:
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {recommendations.map((rec) => (
          <Button
            key={rec}
            variant="outline"
            size="sm"
            className="h-auto justify-start whitespace-normal py-2 text-left"
            onClick={() => onSendMessage(rec)}
          >
            {rec}
          </Button>
        ))}
      </div>
    </div>
  );
}

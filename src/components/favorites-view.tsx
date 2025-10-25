'use client';

import { Heart, Trash2 } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChatAvatar } from './chat-avatar';
import { EmptyState } from './empty-state';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';

export function FavoritesView() {
  const { favorites, removeFavorite, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <p>Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <header className="border-b p-4">
        <h1 className="flex items-center gap-2 text-xl font-bold">
          <Heart className="size-5 text-accent" />
          Favorite Answers
        </h1>
        <p className="text-muted-foreground">
          Review your saved answers for quick access.
        </p>
      </header>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {favorites.length === 0 ? (
            <EmptyState
              icon={<Heart />}
              title="No Favorites Yet"
              description="Click the heart icon on an answer to save it here."
            />
          ) : (
            <div className="space-y-4">
              {favorites.map((message) => (
                <Card key={message.id} className="shadow-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="flex items-center gap-2">
                      <ChatAvatar role="assistant" />
                      <CardTitle className="text-base font-medium">
                        AI Assistant
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFavorite(message.id)}
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/90">
                      {message.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Message } from '@/lib/types';
import { useToast } from './use-toast';

const FAVORITES_KEY = 'zamrudchat_favorites';

export function useFavorites() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(FAVORITES_KEY);
      if (item) {
        const parsedFavorites = JSON.parse(item).map((fav: any) => ({
          ...fav,
          createdAt: new Date(fav.createdAt), // Ensure createdAt is a Date object
        }));
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error('Failed to load favorites from localStorage', error);
      toast({
        title: 'Error',
        description: 'Could not load your saved favorites.',
        variant: 'destructive',
      });
    }
    setIsLoaded(true);
  }, [toast]);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites to localStorage', error);
        toast({
          title: 'Error',
          description: 'Could not save your favorites.',
          variant: 'destructive',
        });
      }
    }
  }, [favorites, isLoaded, toast]);

  const addFavorite = useCallback(
    (message: Message) => {
      if (message.role !== 'assistant') return;
      setFavorites((prevFavorites) => {
        if (prevFavorites.some((fav) => fav.id === message.id)) {
          return prevFavorites;
        }
        toast({
          title: 'Added to Favorites',
          description: 'The answer has been saved.',
        });
        return [...prevFavorites, message];
      });
    },
    [toast]
  );

  const removeFavorite = useCallback(
    (messageId: string) => {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== messageId)
      );
      toast({
        title: 'Removed from Favorites',
        description: 'The answer has been removed from your saved list.',
      });
    },
    [toast]
  );

  const isFavorite = useCallback(
    (messageId: string) => {
      return favorites.some((fav) => fav.id === messageId);
    },
    [favorites]
  );

  return { favorites, addFavorite, removeFavorite, isFavorite, isLoaded };
}

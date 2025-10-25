'use client';

import * as React from 'react';
import { Bot, Heart, MessageSquare } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { ChatView } from './chat-view';
import { FavoritesView } from './favorites-view';

type View = 'chat' | 'favorites';

export function AppShell() {
  const [activeView, setActiveView] = React.useState<View>('chat');

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo className="size-8" />
            <span className="text-lg font-semibold text-sidebar-primary-foreground">
              ChatBot
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView('chat')}
                isActive={activeView === 'chat'}
                tooltip="Chat"
              >
                <MessageSquare />
                <span>Chat</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setActiveView('favorites')}
                isActive={activeView === 'favorites'}
                tooltip="Favorit"
              >
                <Heart />
                <span>Favorit</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex h-full flex-col">
          {activeView === 'chat' && <ChatView />}
          {activeView === 'favorites' && <FavoritesView />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";

interface UnreadContextType {
  totalUnread: number;
  unreadByConversation: Record<number, number>;
  markAsRead: (conversationId: number) => void;
}

const UnreadContext = createContext<UnreadContextType | null>(null);

const initialUnread: Record<number, number> = { 1: 2, 2: 0, 3: 1 };

export function UnreadProvider({ children }: { children: ReactNode }) {
  const [unreadByConversation, setUnreadByConversation] = useState<Record<number, number>>(initialUnread);

  const markAsRead = useCallback((conversationId: number) => {
    setUnreadByConversation((prev) => {
      if ((prev[conversationId] ?? 0) === 0) return prev;
      return { ...prev, [conversationId]: 0 };
    });
  }, []);

  const totalUnread = useMemo(
    () => Object.values(unreadByConversation).reduce((sum, count) => sum + count, 0),
    [unreadByConversation]
  );

  const value = useMemo(
    () => ({ totalUnread, unreadByConversation, markAsRead }),
    [totalUnread, unreadByConversation, markAsRead]
  );

  return <UnreadContext.Provider value={value}>{children}</UnreadContext.Provider>;
}

export function useUnread() {
  const ctx = useContext(UnreadContext);
  if (!ctx) throw new Error("useUnread must be used within an UnreadProvider");
  return ctx;
}

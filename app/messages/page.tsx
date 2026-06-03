"use client";

import { useState, useCallback, useMemo, useRef, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { Search, Send, User, Bot } from "lucide-react";
import { useUnread } from "@/lib/UnreadContext";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  lastMsg: string;
  time: string;
  roleLabel: string;
}

const conversations: Conversation[] = [
  { id: 1, name: "Learning Assistant", lastMsg: "How can I help you today?", time: "9:05 AM", roleLabel: "Assistant" },
  { id: 2, name: "Study Group: React", lastMsg: "Great session everyone!", time: "Yesterday", roleLabel: "Group Chat" },
  { id: 3, name: "Mentor: Sarah", lastMsg: "Your project looks great!", time: "2 days ago", roleLabel: "Mentor" },
];

type MessagesMap = Record<number, Message[]>;

const initialMessages: MessagesMap = {
  1: [
    { id: 1, role: "assistant", content: "Welcome to LearnLab! I'm your learning assistant. How can I help you today?", time: "9:00 AM" },
    { id: 2, role: "user", content: "Can you recommend resources for learning TypeScript?", time: "9:05 AM" },
    { id: 3, role: "assistant", content: "Sure! I recommend starting with the official TypeScript Handbook, then checking out our 'TypeScript Essentials' course. You're already at 86% progress there!", time: "9:05 AM" },
  ],
  2: [
    { id: 1, role: "assistant", content: "Welcome to the React Study Group! Today we're discussing hooks and state management.", time: "3:00 PM" },
    { id: 2, role: "user", content: "I've been using useState extensively but want to learn useReducer.", time: "3:15 PM" },
    { id: 3, role: "assistant", content: "Great topic! useReducer is perfect for complex state logic. Let's look at some examples.", time: "3:20 PM" },
    { id: 4, role: "user", content: "That makes sense now. Thanks for the explanation!", time: "4:00 PM" },
    { id: 5, role: "assistant", content: "Great session everyone!", time: "4:05 PM" },
  ],
  3: [
    { id: 1, role: "assistant", content: "Hi there! I've reviewed your latest project submission.", time: "10:00 AM" },
    { id: 2, role: "user", content: "Thanks Sarah! How did it look?", time: "10:30 AM" },
    { id: 3, role: "assistant", content: "Your project looks great! The component architecture is well-structured. I'd suggest adding more error boundary handling.", time: "10:35 AM" },
  ],
};

function ChatBubble({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
    >
      {msg.role === "assistant" && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
          <Bot className="size-4 text-cyan-400" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          msg.role === "user"
            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            : "bg-[#1a1a1a]"
        }`}
      >
        <p className="text-sm text-zinc-300">{msg.content}</p>
        <p className="mt-1 text-[10px] text-zinc-600">{msg.time}</p>
      </div>
      {msg.role === "user" && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800">
          <User className="size-4 text-zinc-400" />
        </div>
      )}
    </motion.div>
  );
}

const ChatBubbleMemo = memo(ChatBubble);

interface ConversationItemProps {
  chat: Conversation;
  isActive: boolean;
  unreadCount: number;
  onSelect: (id: number) => void;
}

function ConversationItem({ chat, isActive, unreadCount, onSelect }: ConversationItemProps) {
  return (
    <button
      onClick={() => onSelect(chat.id)}
      className={`relative w-full rounded-xl p-3 text-left transition-colors ${
        isActive
          ? "bg-white/[0.06] shadow-[inset_0_0_20px_rgba(6,182,212,0.06)]"
          : "hover:bg-white/[0.02]"
      }`}
    >
      <div className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 transition-opacity" style={isActive ? { opacity: 1 } : undefined} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-300">{chat.name}</span>
          {unreadCount > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <span className="text-[10px] text-zinc-600">{chat.time}</span>
      </div>
      <p className="mt-1 truncate text-xs text-zinc-600">{chat.roleLabel} · {chat.lastMsg}</p>
    </button>
  );
}

const ConversationItemMemo = memo(ConversationItem);

function MessagesPanel({
  conversationId,
  messages,
  onSend,
}: {
  conversationId: number;
  messages: Message[];
  onSend: (text: string) => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  }, [input, onSend]);

  const activeConversation = conversations.find((c) => c.id === conversationId);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
          <Bot className="size-4 text-cyan-400" />
        </div>
        <div>
          <p className="text-sm font-medium text-zinc-200">{activeConversation?.name}</p>
          <p className="text-[10px] text-zinc-600">{activeConversation?.roleLabel}</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <ChatBubbleMemo key={msg.id} msg={msg} />
        ))}
      </div>

      <div className="border-t border-[#1f1f1f] p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] px-4 py-2.5 text-sm text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white transition-opacity hover:opacity-90"
          >
            <Send className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ConversationList({
  conversations,
  selectedId,
  onSelect,
  unreadByConversation,
}: {
  conversations: Conversation[];
  selectedId: number;
  onSelect: (id: number) => void;
  unreadByConversation: Record<number, number>;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      search.trim()
        ? conversations.filter((c) =>
            c.name.toLowerCase().includes(search.toLowerCase())
          )
        : conversations,
    [search, conversations]
  );

  return (
    <div className="hidden w-72 flex-col border-r border-[#1f1f1f] bg-[#0f0f0f] md:flex">
      <div className="border-b border-[#1f1f1f] p-4">
        <h2 className="mb-3 text-sm font-medium text-zinc-200">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-[#1f1f1f] bg-[#0a0a0a] py-2 pl-9 pr-3 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-700 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1 p-2">
        {filtered.map((chat) => (
          <ConversationItemMemo
            key={chat.id}
            chat={chat}
            isActive={chat.id === selectedId}
            unreadCount={unreadByConversation[chat.id] ?? 0}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [messagesMap, setMessagesMap] = useState<MessagesMap>(initialMessages);
  const [selectedChat, setSelectedChat] = useState(1);
  const { markAsRead, unreadByConversation } = useUnread();

  const handleSelectConversation = useCallback(
    (id: number) => {
      setSelectedChat(id);
      markAsRead(id);
    },
    [markAsRead]
  );

  const activeMessages = useMemo(() => messagesMap[selectedChat] ?? [], [messagesMap, selectedChat]);

  const handleSend = useCallback(
    (text: string) => {
      const userMsg: Message = {
        id: Date.now(),
        role: "user",
        content: text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessagesMap((prev) => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] ?? []), userMsg],
      }));

      const assistantId = Date.now() + 1;
      setTimeout(() => {
        setMessagesMap((prev) => ({
          ...prev,
          [selectedChat]: [
            ...(prev[selectedChat] ?? []),
            {
              id: assistantId,
              role: "assistant",
              content: "That's a great question! I'm looking into it for you. In the meantime, check out the resources in your dashboard.",
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            },
          ],
        }));
      }, 800);
    },
    [selectedChat]
  );

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] max-w-7xl md:h-[calc(100vh-0rem)]">
      <ConversationList
        conversations={conversations}
        selectedId={selectedChat}
        onSelect={handleSelectConversation}
        unreadByConversation={unreadByConversation}
      />

      <MessagesPanel
        conversationId={selectedChat}
        messages={activeMessages}
        onSend={handleSend}
      />
    </div>
  );
}

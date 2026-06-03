import {
  LayoutDashboard,
  BookOpen,
  Activity,
  MessageSquare,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
  id: string;
}

export const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/", id: "dashboard" },
  { icon: BookOpen, label: "Courses", href: "/courses", id: "courses" },
  { icon: Activity, label: "Activity", href: "/activity", id: "activity" },
  { icon: MessageSquare, label: "Messages", href: "/messages", id: "messages" },
  { icon: Settings, label: "Settings", href: "/settings", id: "settings" },
];

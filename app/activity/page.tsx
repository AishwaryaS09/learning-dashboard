import type { Metadata } from "next";
import { ActivityPageClient } from "./client";

export const metadata: Metadata = {
  title: "Activity — LearnLab",
  description: "View your learning activity and streaks.",
};

export default function ActivityPage() {
  return <ActivityPageClient />;
}

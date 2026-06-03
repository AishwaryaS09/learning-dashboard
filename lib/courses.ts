import { getServerSupabaseClient } from "@/lib/supabase/server";
import type { Course, DashboardError } from "@/types/course";

export async function fetchCourses(): Promise<{
  data: Course[] | null;
  error: DashboardError | null;
}> {
  try {
    const supabase = getServerSupabaseClient();

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return { data: null, error: { message: error.message } };
    }

    return { data: data as Course[], error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("Failed to fetch courses:", message);
    return { data: null, error: { message } };
  }
}

export async function fetchCourseById(
  id: string
): Promise<{
  data: Course | null;
  error: DashboardError | null;
}> {
  try {
    const supabase = getServerSupabaseClient();

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase fetch error:", error.message);
      return { data: null, error: { message: error.message } };
    }

    return { data: data as Course, error: null };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "An unexpected error occurred";
    console.error("Failed to fetch course:", message);
    return { data: null, error: { message } };
  }
}

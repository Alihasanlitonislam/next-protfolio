export type TabKey = "personal" | "professional" | "education";

export interface AboutContentItem {
  type: TabKey;
  title: string;
  discretion: string;
}
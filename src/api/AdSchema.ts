type TextType = "text";
type MediaType = "image" | "video";
export type AdType = TextType | MediaType;

export type AdSchema = {
  id: number;
  impressions: number;
  clicks: number;
  ctr: number;
} & (
  | {
      type: MediaType;
      url: string;
    }
  | {
      type: TextType;
      headline: string;
      description: string;
    }
);

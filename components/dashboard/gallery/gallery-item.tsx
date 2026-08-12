import type { GalleryItem } from "@/lib/types";

export default function GalleryCard({ item }: { item: GalleryItem }) {
  return <div className="rounded-xl border p-5">{item.type}</div>;
}

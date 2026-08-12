import { GalleryItem } from "@/lib/types";
import GalleryCard from "./gallery-card";

type Props = {
  gallery: GalleryItem[];
};

export default function GalleryGrid({ gallery }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

import { GalleryItem } from "@/lib/types";
import GalleryCard from "./gallery-card";

type Props = {
  gallery: GalleryItem[];
};

export default function GalleryGrid({ gallery }: Props) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {gallery.map((item) => (
        <div key={item.id} className="mb-5 break-inside-avoid">
          <GalleryCard item={item} />
        </div>
      ))}
    </div>
  );
}

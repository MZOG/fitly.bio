import { GalleryItem } from "@/lib/types";
import GalleryCard from "./gallery-item";

type Props = {
  gallery: GalleryItem[];
};

export function GalleryList({ gallery }: Props) {
  return (
    <div className="mt-8">
      {gallery.map((item) => (
        <GalleryCard key={item.id} item={item} />
      ))}
    </div>
  );
}

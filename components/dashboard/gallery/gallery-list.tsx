import { GalleryItem } from "@/lib/types";
import GalleryGrid from "./gallery-grid";
import BeforeAfterCard from "./before-after-card";

type Props = {
  gallery: GalleryItem[];
};

export function GalleryList({ gallery }: Props) {
  const images = gallery.filter((item) => item.type === "image");

  const beforeAfter = gallery.filter((item) => item.type === "before_after");

  return (
    <div className="space-y-10">
      {images.length > 0 && (
        <section>
          <h2 className="mb-5 text-lg font-semibold">Zdjęcia</h2>

          <GalleryGrid gallery={images} />
        </section>
      )}

      {beforeAfter.length > 0 && (
        <section>
          <h2 className="mb-5 text-lg font-semibold">Metamorfozy</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {beforeAfter.map((item) => (
              <BeforeAfterCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

import Image from "next/image";
import { GalleryItem } from "@/lib/types";
import BeforeAfter from "../dashboard/gallery/before-after";

type Props = {
  gallery: GalleryItem[];
};

export default function Gallery({ gallery }: Props) {
  const images = gallery.filter((item) => item.type === "image");
  const transformations = gallery.filter(
    (item) => item.type === "before_after",
  );

  if (!gallery.length) {
    return null;
  }

  return (
    <div className="space-y-12">
      {/* GALERIA */}
      {images.length > 0 && (
        <section>
          <h2
            id="specializations-title"
            className="mb-3 text-sm font-grotesk font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Galeria
          </h2>

          <div className="columns-2 gap-3">
            {images.map((item) => (
              <div
                key={item.id}
                className="mb-3 break-inside-avoid overflow-hidden rounded-2xl"
              >
                {item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={item.caption ?? "Zdjęcie"}
                    width={item.width ?? 1200}
                    height={item.height ?? 1200}
                    className="h-auto w-full"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* METAMORFOZY */}
      {transformations.length > 0 && (
        <section>
          <h2
            id="specializations-title"
            className="mb-3 text-sm font-grotesk font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Metamorfozy
          </h2>

          <div className="space-y-4">
            {transformations.map((item) => (
              <BeforeAfter key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

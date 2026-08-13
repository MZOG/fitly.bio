import Image from "next/image";
import { GalleryItem } from "@/lib/types";

type Props = {
  gallery: GalleryItem[];
};

export default function Gallery({ gallery }: Props) {
  if (!gallery.length) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2
        id="specializations-title"
        className="mb-3 text-sm font-grotesk font-semibold uppercase tracking-wider text-muted-foreground"
      >
        Galeria
      </h2>

      <div className="columns-2 gap-3">
        {gallery.map((item) => (
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
  );
}

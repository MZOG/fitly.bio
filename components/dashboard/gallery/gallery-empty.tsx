import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  onAdd: () => void;
};

export default function GalleryEmpty({ onAdd }: Props) {
  return (
    <div className="rounded-2xl border border-dashed p-12 text-center">
      <ImageIcon className="mx-auto mb-4 size-10 text-muted-foreground" />

      <h3 className="text-lg font-semibold">Nie masz jeszcze żadnych zdjęć</h3>

      <p className="mt-2 text-sm text-muted-foreground">
        Dodaj pierwsze zdjęcie, które pojawi się na Twoim profilu.
      </p>

      <Button className="mt-6" onClick={onAdd}>
        Dodaj zdjęcie
      </Button>
    </div>
  );
}

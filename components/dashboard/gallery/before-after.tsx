"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryItem } from "@/lib/types";

type Props = {
  item: GalleryItem;
};

export default function BeforeAfter({ item }: Props) {
  const [position, setPosition] = useState(50);

  if (!item.before_url || !item.after_url) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* AFTER - pełne tło */}
      <Image
        src={item.after_url}
        alt="Po"
        width={item.after_width ?? 1200}
        height={item.after_height ?? 1200}
        className="block h-auto w-full"
      />

      {/* BEFORE */}
      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={item.before_url}
          alt="Przed"
          width={item.before_width ?? 1200}
          height={item.before_height ?? 1200}
          className="block h-full w-auto max-w-none"
        />
      </div>

      {/* SLIDER */}
      <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-md" />

        <div className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <span className="text-sm font-semibold text-gray-700">↔</span>
        </div>
      </div>

      {/* RANGE */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Porównaj zdjęcia przed i po"
      />
    </div>
  );
}

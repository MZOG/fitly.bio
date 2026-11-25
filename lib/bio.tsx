import { Fragment, type ReactNode } from "react";

// Bio is stored as plain text. Line breaks are kept as-is and **text** marks bold.
const BOLD = /\*\*(.+?)\*\*/g;

export function renderBio(text: string): ReactNode {
  return text.split(/(\*\*.+?\*\*)/g).map((part, i) => {
    const match = /^\*\*(.+)\*\*$/.exec(part);
    return match ? (
      <span key={i} className="font-semibold">
        {match[1]}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    );
  });
}

/** Plain text for meta tags: no bold markers, single spaces instead of line breaks. */
export function bioToPlainText(text: string): string {
  return text.replace(BOLD, "$1").replace(/\s+/g, " ").trim();
}

export function BioText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={`whitespace-pre-line break-words ${className ?? ""}`}>
      {renderBio(text)}
    </p>
  );
}

type HighlightTextProps = {
  text: string;
  query: string;
};

export function HighlightText({
  text,
  query,
}: HighlightTextProps) {
  const trimmedQuery =
    query.trim();

  if (!trimmedQuery) {
    return <>{text}</>;
  }

  const escapedQuery =
    trimmedQuery.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );

  const expression =
    new RegExp(
      `(${escapedQuery})`,
      "gi",
    );

  const pieces =
    text.split(expression);

  return (
    <>
      {pieces.map(
        (piece, index) => {
          const isMatch =
            piece.toLowerCase() ===
            trimmedQuery.toLowerCase();

          if (isMatch) {
            return (
              <mark
                key={index}
                className="rounded bg-cyan-300/20 px-0.5 text-cyan-100"
              >
                {piece}
              </mark>
            );
          }

          return (
            <span key={index}>
              {piece}
            </span>
          );
        },
      )}
    </>
  );
}
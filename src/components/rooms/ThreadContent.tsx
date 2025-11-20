/**
 * Component to render thread content with auto-linked URLs.
 * Converts plain text URLs into clickable links.
 */
"use client";

interface ThreadContentProps {
  content: string;
}

export function ThreadContent({ content }: ThreadContentProps) {
  // Split content into lines and process markdown-style links
  const lines = content.split("\n");

  return (
    <div className="text-slate-200 space-y-2">
      {lines.map((line, index) => {
        // Check for markdown-style links: [text](url)
        const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

        if (markdownLinkRegex.test(line)) {
          // Parse markdown links
          const parts: (string | { text: string; url: string })[] = [];
          let lastIndex = 0;
          const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
          let match;

          while ((match = regex.exec(line)) !== null) {
            // Add text before the link
            if (match.index > lastIndex) {
              parts.push(line.substring(lastIndex, match.index));
            }
            // Add the link
            parts.push({ text: match[1], url: match[2] });
            lastIndex = match.index + match[0].length;
          }

          // Add remaining text
          if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
          }

          return (
            <p key={index} className="whitespace-pre-wrap">
              {parts.map((part, partIndex) => {
                if (typeof part === "string") {
                  return <span key={partIndex}>{part}</span>;
                }

                return (
                  <a
                    key={partIndex}
                    href={part.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={part.url}
                    className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                  >
                    {part.text}
                  </a>
                );
              })}
            </p>
          );
        }

        // Regular line without markdown links
        return (
          <p key={index} className="whitespace-pre-wrap">
            {line || "\u00A0"} {/* Non-breaking space for empty lines */}
          </p>
        );
      })}
    </div>
  );
}


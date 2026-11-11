// Used to fade blocks up as they scrolled into view. The taste skill, Emil Kowalski's
// rules and the Vercel guidelines all ask for no reveal on every section: content is
// there when the visitor arrives, and motion is kept for the hero entrance and the
// few places where it explains something. The component stays so callers keep
// their markup; the extra props are accepted and ignored.
export function Reveal({
  children,
  className = "",
  as = "div",
  style,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article" | "section"
  style?: React.CSSProperties
  y?: number
}) {
  const Tag = as
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  )
}

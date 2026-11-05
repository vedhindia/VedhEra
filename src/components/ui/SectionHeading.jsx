/**
 * Editorial section heading.
 *
 * @param {object} props
 * @param {string} [props.eyebrow] Small uppercase label above the heading.
 * @param {string} props.title     The heading text.
 * @param {string} [props.body]    Optional supporting paragraph.
 * @param {"dark"|"light"} [props.tone] Colour scheme of the section.
 * @param {"left"|"center"} [props.align]
 * @param {"h2"|"h3"} [props.as] Heading level for correct document outline.
 * @param {string} [props.id] Optional id applied to the heading element so
 *   sections can reference it with `aria-labelledby`.
 */
export default function SectionHeading({
  eyebrow,
  title,
  body,
  tone = "dark",
  align = "left",
  as: Tag = "h2",
  id,
  className = "",
  children,
}) {
  const isDark = tone === "dark";
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-medium tracking-[0.3em] uppercase ${
            isDark ? "text-[var(--color-silver)]" : "text-[var(--color-medium-grey)]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`max-w-3xl text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-5xl ${
          isDark ? "text-white" : "text-[var(--color-graphite)]"
        }`}
      >
        {title}
      </Tag>
      {body && (
        <p
          className={`mt-6 text-base leading-relaxed sm:text-lg ${
            isDark ? "text-[var(--color-silver)]" : "text-[var(--color-charcoal)]"
          }`}
        >
          {body}
        </p>
      )}
      {children}
    </div>
  );
}
export default function AnimatedBorder({
  children,
  className = "",
  duration = "4s",
}) {
  return (
    <div
      style={{
        animationDuration: duration,
        background: `
          linear-gradient(45deg,#172033,#1e293b 50%,#172033) padding-box,
          conic-gradient(
            from var(--border-angle),
            rgba(71,85,105,.48) 80%,
            #6366f1 86%,
            #a5b4fc 90%,
            #6366f1 94%,
            rgba(71,85,105,.48)
          ) border-box
        `,
      }}
      className={`
        rounded-2xl
        border
        border-transparent
        animate-border
        ${className}
      `}
    >
      {children}
    </div>
  );
}

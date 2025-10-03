function TagBox({
  text,
  color,
  textColor,
  children,
  className,
}: {
  text: string;
  color: string;
  textColor?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-sm px-2 py-1 rounded 
        text-xs font-semibold shadow-md items-center justify-center ${className}`}
      style={{ backgroundColor: color, color: textColor || "#fff" }}
    >
      <span className="text-center">{text}</span>
      {children}
    </div>
  );
}

export { TagBox };

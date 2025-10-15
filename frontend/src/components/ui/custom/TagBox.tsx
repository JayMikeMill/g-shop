function TagBox({
  text,
  color,
  textColor,
  children,
  className,
}: {
  text: string;
  color?: string;
  textColor?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const styles: any = {};
  if (color) {
    // @ts-ignore
    styles["backgroundColor"] = color;
  }
  if (textColor) {
    styles["color"] = textColor;
  }

  return (
    <div
      className={`flex items-center gap-sm px-2 py-1 rounded 
        text-md font-bold shadow-md items-center justify-center ${className}`}
      style={styles}
    >
      <span className="text-center">{text}</span>
      {children}
    </div>
  );
}

export { TagBox };

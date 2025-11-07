export function formatMMDDYYYY(dateInput: string | Date): string {
  const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const pad = (n: number) => n.toString().padStart(2, "0");

  let hours = d.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12; // 12 AM or 12 PM

  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${d.getFullYear()}, ${pad(hours)}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${ampm}`;
}

/**
 * Formats milliseconds into a MM:SS string format
 * @param ms Time in milliseconds
 * @returns Formatted string in MM:SS format (e.g. "30:00")
 */
export function formatTime(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

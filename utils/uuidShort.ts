export function uuidShort(): string {
  return Math.random().toString(36).slice(-4);
}

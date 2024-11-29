export function getRandomIndex(max: number): number {
  return Math.floor(Math.random() * max);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
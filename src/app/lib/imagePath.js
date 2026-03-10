export function getImagePath(filename) {
  // Get basePath from environment or default to empty string for dev
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}/${filename}`;
}

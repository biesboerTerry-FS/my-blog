export function getImagePath(filename) {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  const normalizedFilename = String(filename || '').replace(/^\/+/, '');
  return `${basePath}/${normalizedFilename}`;
}

export function getAssetUrl(path: string): string {
    const baseUrl = process.env.PUBLIC_URL || '';
    return `${baseUrl}${path}`;
  }